import pymysql
import csv

# MySQL Database Connection Details
DB_HOST = "localhost"
DB_USER = "root"  # Change this to your MySQL username
DB_PASSWORD = "PASSWORD"  # Change this to your MySQL password
DB_NAME = "Movies"

# CSV File Path
CSV_FILE_PATH = "/Users/julianjenkins/solo/IMDBTop250Movies.csv"

try:
    # Establish database connection
    connection = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
    cursor = connection.cursor()

    # SQL Query to Insert Data
    sql = """INSERT IGNORE INTO Movie (movieID, movieName, movieYear, rating, run_time, tagline, budget, box_office, certificateID)
             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    directSQL = "INSERT IGNORE INTO Director (directorName) VALUES (%s)"  # Insert only directorName
    genreSQL = "INSERT IGNORE INTO Genre (genreID, genreName) VALUES (%s, %s)"
    certificateSQL = "INSERT IGNORE INTO Certificate (certificateName) VALUES (%s)"
    moviedirectorSQL = "INSERT IGNORE INTO MovieDirector (movieID, directorID) VALUES (%s, %s)"
    movieGenreSQL = "INSERT IGNORE INTO MovieGenre (movieID, genreID) VALUES (%s, %s)"

    # Read CSV File
    with open(CSV_FILE_PATH, "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader) 

        for row in reader:
            if len(row) < 11:  # Ensure the row has enough columns
                continue

            movieID = int(row[0])  # Assuming movieID is an integer, use the rank value
            movieName = row[1]
            movieYear = row[2]
            rating = float(row[3])
            genres = row[4].split(',')  # Split multiple genres by comma
            certificate = row[5]
            runTime = row[6]
            tagline = row[7]
            try:
                budget = int(row[8])
            except ValueError:
                budget = None  # Handle missing or non-integer budget
            try:
                boxOffice = int(row[9])
            except ValueError:
                boxOffice = None  # Handle missing or non-integer box office
            directors = row[10].split(',')  # Split multiple directors by comma

            # Insert Certificate and get certificateID
            cursor.execute(certificateSQL, (certificate,))
            connection.commit()  # Commit the certificate insertion
            
            # Retrieve the certificateID after insertion
            cursor.execute("SELECT certificateID FROM Certificate WHERE certificateName = %s", (certificate,))
            certificate_result = cursor.fetchone()
            
            if certificate_result:  # Ensure certificate_result is not None
                certificateID = certificate_result[0]
            else:
                print(f"Certificate not found for: {certificate}")
                continue  # Skip this row if no certificateID is found

            # Insert multiple Directors and get directorIDs
            directorIDs = []
            for director in directors:
                director = director.strip()  # Remove extra spaces around director name
                cursor.execute(directSQL, (director,))
                connection.commit()  # Commit the director insertion
                cursor.execute("SELECT directorID FROM Director WHERE directorName = %s", (director,))
                director_result = cursor.fetchone()
                if director_result:  # Ensure director_result is not None
                    directorID = director_result[0]
                    directorIDs.append(directorID)
                else:
                    continue  # Skip this director if it doesn't exist

            # Insert Movie data into the Movie table
            cursor.execute(sql, (movieID, movieName, movieYear, rating, runTime, tagline, budget, boxOffice, certificateID))

            # Insert multiple genres and link them to the movie
            for genre in genres:
                genre = genre.strip()  # Remove extra spaces around genre name
                cursor.execute(genreSQL, (movieID, genre))
                connection.commit()  # Commit the genre insertion
                cursor.execute("SELECT genreID FROM Genre WHERE genreName = %s", (genre,))
                genre_result = cursor.fetchone()
                if genre_result:  # Ensure genre_result is not None
                    genreID = genre_result[0]
                    # Link the movie with this genre
                    cursor.execute(movieGenreSQL, (movieID, genreID))
                    connection.commit()
                else:
                    continue  # Skip this genre if it doesn't exist

            # Link each director to the movie using MovieDirector table
            for directorID in directorIDs:
                cursor.execute(moviedirectorSQL, (movieID, directorID))
                connection.commit()

    # Commit all changes to the database
    connection.commit()
    print("Data imported successfully!")

except pymysql.MySQLError as e:
    print(f"Error occurred: {e}")
    print(f"SQL Query: {cursor.statement}")

finally:
    cursor.close()
    connection.close()
