# CareerConnect — Database Configuration Guide

This guide describes how the PostgreSQL 16 database is managed, structured, and migrated for the CareerConnect platform.

---

## 1. Local Database Setup

### Option A: Run via Docker (Recommended)
Run PostgreSQL 16 in a dedicated container without installing software globally:

```powershell
docker run --name careerconnect-postgres `
  -e POSTGRES_DB=careerconnect_db `
  -e POSTGRES_USER=careerconnect_user `
  -e POSTGRES_PASSWORD=careerconnect_secure_password_2026 `
  -p 5432:5432 `
  -v careerconnect_postgres_data:/var/lib/postgresql/data `
  -d postgres:16-alpine
```

To stop or restart:
```powershell
docker stop careerconnect-postgres
docker start careerconnect-postgres
```

### Option B: Local PostgreSQL Installation
If you already have PostgreSQL installed on Windows:
1. Open `psql` or pgAdmin 4.
2. Create the user and database:
```sql
CREATE USER careerconnect_user WITH PASSWORD 'careerconnect_secure_password_2026';
CREATE DATABASE careerconnect_db OWNER careerconnect_user;
GRANT ALL PRIVILEGES ON DATABASE careerconnect_db TO careerconnect_user;
```

---

## 2. Connection Parameters

| Parameter | Default Value | Notes |
| :--- | :--- | :--- |
| **Host** | `localhost` | `postgres` inside Docker Compose |
| **Port** | `5432` | Standard PostgreSQL port |
| **Database** | `careerconnect_db` | Application database |
| **User** | `careerconnect_user` | Non-superuser app role |
| **Password** | `careerconnect_secure_password_2026` | Configured via `.env` |
| **JDBC URL** | `jdbc:postgresql://localhost:5432/careerconnect_db` | Spring Boot connection URL |

---

## 3. Flyway Migrations Workflow

Migrations are automatically executed by Spring Boot on startup. Migration files reside under:
`careerconnect-api/src/main/resources/db/migration/`

### Migration Naming Convention
Flyway scripts strictly follow the pattern:
```text
V<Version>__<Description>.sql
```
*(Note: Exactly two underscores between version and description!)*

### Applied Migrations
1. **`V1__init_schema.sql`**: Initial table definitions, primary keys, foreign keys, constraints, and performance indexes.
2. **`V2__seed_initial_data.sql`**: Base security roles (`ROLE_STUDENT`, `ROLE_RECRUITER`, `ROLE_ADMIN`) and system admin user.

---

## 4. Useful PostgreSQL Commands

Connect via `psql` in Docker:
```powershell
docker exec -it careerconnect-postgres psql -U careerconnect_user -d careerconnect_db
```

List all tables:
```sql
\dt
```

Check Flyway schema history table:
```sql
SELECT installed_rank, version, description, type, script, success FROM flyway_schema_history;
```

View active database connections:
```sql
SELECT pid, usename, client_addr, state, query FROM pg_stat_activity WHERE datname = 'careerconnect_db';
```

---

## 5. Backup and Restore

Create a logical backup:
```powershell
docker exec -t careerconnect-postgres pg_dump -U careerconnect_user careerconnect_db > database_backup.sql
```

Restore from backup:
```powershell
cat database_backup.sql | docker exec -i careerconnect-postgres psql -U careerconnect_user -d careerconnect_db
```
