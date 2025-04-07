CREATE DATABASE Movies;
USE Movies;

CREATE TABLE Movie (
    movieID INT NOT NULL PRIMARY KEY,
    movieName CHAR(255),
    movieYear VARCHAR(4),
    rating DECIMAL(2,1),
    run_time VARCHAR(400),
    tagline VARCHAR(255),
    budget BIGINT,
    box_office BIGINT,
    certificateID INT,
    FOREIGN KEY (certificateID) REFERENCES Certificate(certificateID)
);

CREATE TABLE Director (
    directorID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    directorName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Genre (
    genreID INT NOT NULL PRIMARY KEY,
    genreName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Certificate (
    certificateID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    certificateName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE MovieDirector (
    movieID INT NOT NULL,
    directorID INT NOT NULL,
    PRIMARY KEY (movieID, directorID),
    FOREIGN KEY (movieID) REFERENCES Movie(movieID),
    FOREIGN KEY (directorID) REFERENCES Director(directorID)
);

CREATE TABLE MovieGenre (
    movieID INT NOT NULL,
    genreID INT NOT NULL,
    PRIMARY KEY (movieID, genreID),
    FOREIGN KEY (movieID) REFERENCES Movie(movieID),
    FOREIGN KEY (genreID) REFERENCES Genre(genreID)
);






SELECT D.directorName, COUNT(MD.movieID) AS total_movies_directed
FROM Director D
JOIN MovieDirector MD ON D.directorID = MD.directorID
GROUP BY D.directorName
ORDER BY total_movies_directed DESC;

SELECT G.genreName, COUNT(MG.movieID) AS total_movies_in_genre
FROM Genre G
JOIN MovieGenre MG ON G.genreID = MG.genreID
GROUP BY G.genreName
ORDER BY total_movies_in_genre DESC;

SELECT C.certificateName, COUNT(M.certificateID) AS total_movies_cert
FROM Certificate c
JOIN Movie M ON C.certificateID = M.certificateID
GROUP BY certificateName
ORDER BY total_movies_cert DESC;

SELECT COUNT(movieID) AS movies_above_100
FROM Movie
WHERE budget > 100000000;
