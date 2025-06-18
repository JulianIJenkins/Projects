use fruit_stand;

# Show the current quantity of each fruit
select fruit_name, sum(quantity) as "Current Quantity"
from Inventory natural join Fruits
group by fruit_id;


# Show how many days are left until each item expires
SELECT fruit_name, inventory_id, quantity, DATEDIFF(expiration_date, CURRENT_DATE()) AS "Days till Expired"
FROM Inventory natural join Fruits
where DATEDIFF(expiration_date, CURRENT_DATE()) > 0;


# For each item, count how many were used before their expiration date
select fruit_name, inventory_id, sum(quantity_used) as "Used before expiry"
from Fruit_Usage_Log natural join Inventory
natural join Fruits
where was_expired = "No"
group by inventory_id;

# For each item, count how many were used before their expiration date 
# as well as the date that they were used 
select fruit_name, inventory_id, quantity_used, used_date
from Fruit_Usage_Log natural join Inventory
natural join Fruits
where was_expired = "No";

# Show all of the suppliers information and prices for each order quantity
select Supplier.supplier_id, supplier_name, phone_number, supplier_price_id, price_per_unit, min_qty, max_qty
from Supplier natural join Supplier_Prices;

# Show all of the suppliers’ prices for each order quantity and their delivery dates
select distinct Supplier_Prices.supplier_id, supplier_name, supplier_price_id, price_per_unit, delivery_date, min_qty, max_qty
from Supplier_Prices natural join Supplier natural join Deliveries;


# Show all of the suppliers’ prices for each order quantity and their restock dates 
select distinct Supplier_Prices.supplier_id, supplier_name, price_per_unit, restock_date, min_qty, max_qty
from Supplier_Prices natural join Supplier natural join Deliveries;

# For each item, show how many days are left until the restock date 
SELECT fruit_name, store_location, 
       DATEDIFF(restock_date, CURRENT_DATE()) AS "Days till Restock"
FROM Supplier 
NATURAL JOIN Deliveries 
NATURAL JOIN Fruits
WHERE DATEDIFF(restock_date, CURRENT_DATE()) > 0;

# For each item, show how many days are left until a new shipment arrives 
select fruit_name, store_location, DATEDIFF(delivery_date, CURRENT_DATE()) as "Days till shipment arrives"
from Deliveries Supplier natural join Deliveries natural join Fruits
where DATEDIFF(delivery_date, CURRENT_DATE()) > 0;

# Show how many days are left until the bananas, mangoes, and avocados expire
select fruit_name, inventory_id, store_location, DATEDIFF(expiration_date, CURRENT_DATE()) as "Days till expiry"
from Fruits natural join Inventory
where DATEDIFF(expiration_date, CURRENT_DATE()) > 0
order by store_location;

# Count the fruit that is currently expired
select sum(quantity) as "# that has expired"
from Fruits natural join Inventory
where expiration_date < CURRENT_DATE();

# Show the serial number and quantity of each fruit that is expired 
select fruit_name, serial_number, quantity
from Fruits natural join Inventory
where expiration_date < CURRENT_DATE();

# How many days are left until the bananas, mangoes, and avocados are ripe?
select fruit_name, inventory_id, (ripening_days - (DATEDIFF(CURRENT_DATE(), received_date))) as "Day until Ripe"
from Fruits natural join Inventory
where (ripening_days - (DATEDIFF(CURRENT_DATE(), received_date))) > 0;

# Show each of the suppliers delivery history for the past month 
select delivery_id, supplier_id, order_date, delivery_date, delivery_status 
from Deliveries;

# For each product where the current date is past the restock date, show the delivery status 
select fruit_name,delivery_id, supplier_id, delivery_status
from Deliveries natural join Fruits
where CURRENT_DATE() > restock_date;

# Count the number of total items that were sold in Boston vs in LA over the past month 
select store_location, sum(quantity_sold) as "total number of fruits sold"
from Sales 
where MONTH(sale_date) = MONTH(CURRENT_DATE()) and YEAR(sale_date) = YEAR(CURRENT_DATE())
group by store_location;

# Show the time of the year each fruit is in season
select fruit_name, season_start, season_end 
from Fruits;

# For each day of the week, show the average amount of fruit that is sold 
SELECT DAYNAME(sale_date) AS "Day of week", AVG(quantity_sold) AS "avg qty sold"
FROM Sales
GROUP BY DAYNAME(sale_date)
order by AVG(quantity_sold) desc;
;


# For each month this year, show total amount of fruits that were sold in both locations
select MONTHNAME(sale_date) as "Month",  sum(quantity_sold) as "total qty sold"
from Sales
group by MONTHNAME(sale_date)
order by MONTHNAME(sale_date);


# for each item , show qty on shelf vs storage

select fruit_name, store_location, sum(quantity) as "qty on shelf"
from Inventory natural join Fruits
where on_shelf = "yes"
group by fruit_id, store_location;





