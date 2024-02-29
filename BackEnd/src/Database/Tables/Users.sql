USE Shopit

CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    Fname VARCHAR(255)  NOT NULL,
    Lname VARCHAR(255)  NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
	role VARCHAR(255) DEFAULT 'user',
    phone_number VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    isdeleted BIT DEFAULT 0
);

ALTER TABLE Users
ADD CONSTRAINT DF_Users_created_at DEFAULT (GETDATE()) FOR created_at;

ALTER TABLE Users
ADD isWelcomed BIT DEFAULT 0;


SELECT * FROM Users