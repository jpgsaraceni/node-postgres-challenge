/******************************
 * ANCHOR CREATE A FIRST USER *
 ******************************/

/**********************************************************************
 * THE PASSWORD USED IS A HASH EXTERNALLY GENERATED ONLY FOR INITIAL  *
 *  TESTING, WHEN NODE IS RUNNING IT WILL BE GENERATED USING BCRYPT.  *
 **********************************************************************/

 INSERT INTO users
	(name, email, password)
VALUES
	('Saraceni','jpgsaraceni@gmail.com','$2b$10$Ot4psF1/X.kPV4ugzTC/V.HN7ShCH7t6WwvzYGIm8gsBuyyC9R2sq');