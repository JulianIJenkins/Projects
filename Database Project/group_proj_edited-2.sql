create database fruit_stand;
use fruit_stand;

drop table Fruits;
drop table Supplier;
drop table Deliveries;
drop table Supplier_Prices;
drop table Fruit_Usage_Log;
drop table Inventory;
drop table Sales;



create table Fruits (
	fruit_id int primary key,
    fruit_name varchar(30),
    season_start datetime,
    season_end datetime,
    ripening_days int,
    shelf_life_days int
);


create table Supplier (
	supplier_id varchar(10) primary key,
    supplier_name varchar(30),
    phone_number bigint
);

create table Inventory (
	inventory_id int primary key,
    fruit_id int,
    store_location varchar(20),
    serial_number int,
    quantity int,
    received_date datetime,
    expiration_date datetime,
    on_shelf varchar(3),
    foreign key (fruit_id) references Fruits(fruit_id)
);



create table Supplier_Prices (
	supplier_price_id int primary key, 
    supplier_id varchar(10),
    fruit_id int,
    min_qty int,
    max_qty int,
    price_per_unit decimal(4,2),
    start_date datetime,
    end_date datetime,
    foreign key (supplier_id) references Supplier(supplier_id),
    foreign key (fruit_id) references Fruits(fruit_id)
);


create table Sales (
	sale_id int primary key,
    inventory_id int,
    sale_date datetime,
    quantity_sold int,
    store_location varchar(20),
    foreign key (inventory_id) references Inventory(inventory_id)
);

create table Deliveries (
	delivery_id int primary key,
    supplier_id varchar(10),
    fruit_id int,
    store_location varchar(20),
    quantity_ordered int,
    order_date datetime,
    delivery_date datetime,
    restock_date datetime,
    delivery_status varchar(20),
    foreign key (supplier_id) references Supplier(supplier_id),
    foreign key (fruit_id) references Fruits(fruit_id)
);


create table Fruit_Usage_Log (
	usage_id int primary key,
    inventory_id int,
    used_date datetime,
    quantity_used int,
    was_expired varchar(10),
	foreign key (inventory_id) references Inventory(inventory_id)
);
