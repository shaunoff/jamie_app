DROP TABLE if exists Day;

CREATE TABLE Day
(
  id                       INT NOT NULL,
  actualDate              DATE NOT NULL,
  epoch                    BIGINT NOT NULL,
  daySuffix               VARCHAR(4) NOT NULL,
  dayName                 VARCHAR(9) NOT NULL,
  dayOfWeek              INT NOT NULL,
  dayOfMonth             INT NOT NULL,
  dayOfQuarter          INT NOT NULL,
  dayOfYear              INT NOT NULL,
  weekOfMonth            INT NOT NULL,
  weekOfYear             INT NOT NULL,
  weekOfYearIso         CHAR(10) NOT NULL,
  monthActual             INT NOT NULL,
  monthName               VARCHAR(9) NOT NULL,
  monthNameAbbreviated   CHAR(3) NOT NULL,
  quarterActual           INT NOT NULL,
  quarterName             VARCHAR(9) NOT NULL,
  yearActual              INT NOT NULL,
  firstDayOfWeek        DATE NOT NULL,
  lastDayOfWeek         DATE NOT NULL,
  firstDayOfMonth       DATE NOT NULL,
  lastDayOfMonth        DATE NOT NULL,
  firstDayofQuarter    DATE NOT NULL,
  lastDayofQuarter     DATE NOT NULL,
  firstDayOfYear        DATE NOT NULL,
  lastDayOfYear         DATE NOT NULL,
  mmyyyy               CHAR(6) NOT NULL,
  mmddyyyy             CHAR(10) NOT NULL,
  isWeekend            BOOLEAN NOT NULL
);

ALTER TABLE public.Day ADD CONSTRAINT dayDateDimId_pk PRIMARY KEY (id);

CREATE INDEX dayActualDate_idx
  ON Day(actualDate);

COMMIT;

INSERT INTO Day
SELECT TO_CHAR(datum, 'yyyymmdd')::INT AS id,
       datum AS actualDate,
       EXTRACT(EPOCH FROM datum) AS epoch,
       TO_CHAR(datum, 'fmDDth') AS daySuffix,
       TO_CHAR(datum, 'TMDay') AS dayName,
       EXTRACT(ISODOW FROM datum) AS dayOfWeek,
       EXTRACT(DAY FROM datum) AS dayOfMonth,
       datum - DATE_TRUNC('quarter', datum)::DATE + 1 AS dayOfQuarter,
       EXTRACT(DOY FROM datum) AS dayOfYear,
       TO_CHAR(datum, 'W')::INT AS weekOfMonth,
       EXTRACT(WEEK FROM datum) AS weekOfYear,
       EXTRACT(ISOYEAR FROM datum) || TO_CHAR(datum, '"-W"IW-') || EXTRACT(ISODOW FROM datum) AS weekOfYearIso,
       EXTRACT(MONTH FROM datum) AS monthActual,
       TO_CHAR(datum, 'TMMonth') AS monthName,
       TO_CHAR(datum, 'Mon') AS monthNameAbbreviated,
       EXTRACT(QUARTER FROM datum) AS quarterActual,
       CASE
           WHEN EXTRACT(QUARTER FROM datum) = 1 THEN 'First'
           WHEN EXTRACT(QUARTER FROM datum) = 2 THEN 'Second'
           WHEN EXTRACT(QUARTER FROM datum) = 3 THEN 'Third'
           WHEN EXTRACT(QUARTER FROM datum) = 4 THEN 'Fourth'
           END AS quarterName,
       EXTRACT(YEAR FROM datum) AS yearActual,
       datum + (1 - EXTRACT(ISODOW FROM datum))::INT AS firstDayOfWeek,
       datum + (7 - EXTRACT(ISODOW FROM datum))::INT AS lastDayOfWeek,
       datum + (1 - EXTRACT(DAY FROM datum))::INT AS firstDayOfMonth,
       (DATE_TRUNC('MONTH', datum) + INTERVAL '1 MONTH - 1 day')::DATE AS lastDayOfMonth,
       DATE_TRUNC('quarter', datum)::DATE AS first_day_of_quarter,
       (DATE_TRUNC('quarter', datum) + INTERVAL '3 MONTH - 1 day')::DATE AS lastDayofQuarter,
       TO_DATE(EXTRACT(YEAR FROM datum) || '-01-01', 'YYYY-MM-DD') AS firstDayOfYear,
       TO_DATE(EXTRACT(YEAR FROM datum) || '-12-31', 'YYYY-MM-DD') AS lastDayOfYear,
       TO_CHAR(datum, 'mmyyyy') AS mmyyyy,
       TO_CHAR(datum, 'mmddyyyy') AS mmddyyyy,
       CASE
           WHEN EXTRACT(ISODOW FROM datum) IN (6, 7) THEN TRUE
           ELSE FALSE
           END AS isWeekend
FROM (SELECT '2022-01-01'::DATE + SEQUENCE.DAY AS datum
      FROM GENERATE_SERIES(0, 29219) AS SEQUENCE (DAY)
      GROUP BY SEQUENCE.DAY) DQ
ORDER BY 1;

COMMIT;
