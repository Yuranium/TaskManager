DROP TABLE TaskImage, Task CASCADE;

CREATE TABLE IF NOT EXISTS TaskImage(
    id_task_image BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    content_type VARCHAR(20) NOT NULL,
    size BIGINT NOT NULL CHECK ( size > 0 ),
    binary_data BYTEA NOT NULL,
    date_added DATE NOT NULL DEFAULT current_date
);

CREATE TABLE IF NOT EXISTS Task(
    id_task BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL DEFAULT 'Описание отсутствует.',
    importance VARCHAR(20) NOT NULL CHECK(importance IN('LOW', 'INTERMEDIATE', 'HIGH')) DEFAULT 'LOW',
    status VARCHAR(20) NOT NULL CHECK(importance IN('PLANING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'EXPIRED')),
    date_added DATE NOT NULL DEFAULT current_date,
    date_finished TIMESTAMP NOT NULL DEFAULT current_timestamp,
    finished BOOLEAN NOT NULL DEFAULT FALSE,
    id_task_image BIGINT REFERENCES TaskImage(id_task_image) ON DELETE CASCADE ON UPDATE CASCADE
);