use University; 

select ID, NAME
 from Student
 where ID 
 in(select ID from takes where year > 2016);

select dept_name, 
max(salary) as max_salary 
from instructor 
group by dept_name;

select min(max_salary) as min_max_salary
 from (select dept_name, max(salary) as max_salary
 from instructor
 group by dept_name)
 as dept_max_salaries;

use sales;

select count(INV_NUMBER) as numOfinvoices
 from INVOICE;

select count(CUS_CODE) as 'numOfCustomers'
 from customer
 where CUS_BALANCE > 500;

select cus_code, cus_balance
 from customer
 where cus_code in (select cus_code from invoice);

select sum(cus_balance) as sumOfBalance,
 min(cus_balance) as minBalance,
 max(cus_balance) as maxBalance,
 avg(cus_balance) as avgBalance
 from customer;

select cus_code, cus_balance
from customer
where cus_code not in (select cus_code from invoice);

use sakila;

select last_name as 'Last name'
 from actor
 group by last_name
 having count(*) = 1
 order by last_name asc;
 
SELECT a.actor_id as 'Actor ID', 
       a.first_name as 'First Name', 
       a.last_name as 'Last Name', 
       COUNT(fa.film_id) AS Films
FROM actor a, film_actor fa
WHERE a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY Films DESC;

SELECT c.name AS Category, 
       COUNT(f.film_id) AS Films
FROM film f, film_category fc, category c
WHERE f.film_id = fc.film_id
  AND fc.category_id = c.category_id
GROUP BY c.name
ORDER BY Films DESC;
 
 
SELECT title as Film
FROM film
WHERE film_id IN (
    SELECT i.film_id
    FROM rental r, inventory i
    WHERE r.inventory_id = i.inventory_id
    GROUP BY i.film_id
    HAVING COUNT(r.rental_id) = 20
) ORDER BY title ASC;

SELECT f.title AS Title, 
       c.first_name AS 'First Name', 
       c.last_name AS 'Last Name', 
       r.return_date as 'Return Date'
FROM rental r, inventory i, film f, customer c
WHERE r.inventory_id = i.inventory_id
  AND i.film_id = f.film_id
  AND r.customer_id = c.customer_id
  AND r.return_date IS NOT NULL
ORDER BY r.return_date DESC
LIMIT 10;


SELECT c.name AS 'Category', 
       AVG(f.length) AS 'Average Length'
FROM film f, film_category fc, category c
WHERE f.film_id = fc.film_id
  AND fc.category_id = c.category_id
GROUP BY c.name
ORDER BY AVG(f.length) DESC;