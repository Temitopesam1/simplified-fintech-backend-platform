# Database Schema Documentation

## User Table

| Column Name      | Data Type     | Constraints                     | Description                          |
|------------------|---------------|---------------------------------|--------------------------------------|
| id               | INT           | PRIMARY KEY, AUTO_INCREMENT     | Unique identifier for each user.    |
| email            | VARCHAR(255)  | UNIQUE, NOT NULL                | User's email address.               |
| password         | VARCHAR(255)  | NOT NULL                        | Hashed password for user authentication. |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Timestamp of user registration.      |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last profile update.    |

## KYC Table

| Column Name      | Data Type     | Constraints                     | Description                          |
|------------------|---------------|---------------------------------|--------------------------------------|
| id               | INT           | PRIMARY KEY, AUTO_INCREMENT     | Unique identifier for KYC record.   |
| user_id          | INT           | FOREIGN KEY REFERENCES user(id) | Reference to the user.              |
| full_name        | VARCHAR(255)  | NOT NULL                        | User's full name.                   |
| date_of_birth    | DATE          | NOT NULL                        | User's date of birth.               |
| address          | VARCHAR(255)  | NOT NULL                        | User's residential address.         |
| identification_number | VARCHAR(255) | NOT NULL                    | Government-issued ID number.        |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP       | Timestamp of KYC record creation.   |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of last KYC update.       |

## Relationships

- **User to KYC**: One-to-One relationship. Each user can have one KYC record associated with them. The `user_id` in the KYC table references the `id` in the User table.

## Indexes

- An index on `email` in the User table to ensure fast lookups for authentication.
- An index on `user_id` in the KYC table to optimize queries related to user KYC data.

## Migration Scripts

- The initial migration script (`001-init.sql`) will create the above tables and establish the necessary relationships.

## Seed Data

- The `user.seeder.ts` file will provide initial user data for testing purposes, including hashed passwords and KYC information.

## Additional Notes

- Ensure that all sensitive data, such as passwords and identification numbers, are handled securely and comply with relevant data protection regulations.