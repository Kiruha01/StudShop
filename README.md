![](https://img.shields.io/badge/Flask-2.0.2-orange)
![](https://img.shields.io/badge/SQLAlchemy-1.4.26-red)
![](https://img.shields.io/badge/PostgreSQL-13-yellow)
![](https://img.shields.io/badge/React.js-17.0.2-blue)
# Описание
Проект для дисциплины **"Базы данных"**

Сайт представляет собой площадку, где каждый студент может выложить на продажу какую-нибудь
вещь. После одобрения объявления, оно попадает в ленту объявлений, а также в основные 
категории сайта, такие как **Одежда**, **Книги** и т.д. 

Есть возможность забронировать товар. При этом он пометиться, как забронированный. Однако, другие пользователи могут также продолжать бронировать товар, вставая в очередь, если человек перед ними откажется. 

После бронирования можно связаться с продавцом через предоставленный им канал связи.

Авторизация происходит через Google-аккаунт.

## Наименование

StudShop

## Предметная область

Студенческий интернет-магазин

# Данные
## Для каждого элемента данных - ограничения
### User
| name | type | constrains |
| ---- | ---- | ---------- |
| user_id | Integer|  primary_key|
| email| String(100)| unique, not null|
| name | String(100)| nullable |
| com_method | String(100) | not null |
| is_staff| Boolean | not null, default=`false` |

`com_method` - Ссылка на предпочитаемый способ связи (Телеграм, ВК и т.д.)

### Category

| name | type | constrains |
| ---- | ---- | ---------- |
|category_id|Integer| primary_key|
|name | String(20)| not null|


### Location
Место продажи (ПУНК, ВУНК, ДУНК)

| name | type | constrains |
| ---- | ---- | ---------- |
|location_id|Integer| primary_key|
|name | String(20)| not null|

### Product

| name | type | constrains |
| ---- | ---- | ---------- |
|product_id | Integer | primary_key|
|name|String(20)| not null |
|price | Numeric(7, 2) | not null |
|description | Text | nullable |
|category_id | Integer | ForeignKey(Category), nullable, ON DELETE SET NULL |
|location_id|Integer| ForeignKey(Location), not null|
|owner_id | Integer |ForeignKey(User), not null |
| is_active | Boolean | not null, default=`true` |
| is_approved | Boolean | not null,default=`false` |


### Picture
| name | type | constrains |
| ---- | ---- | ---------- |
|picture_id |Integer | primary_key|
|url | String(100) | not null |
|product_id |Integer |ForeignKey(Product), ON DELETE CASCADE |

### Booking
| name | type | constrains |
| ---- | ---- | ---------- |
| booking_id| Integer | primary_key |
| user_id | Integer | ForeignKey(User) |
| product_id | Integer | ForeignKey(Product), ON DELETE CASCADE |
| date | timestamp | not null |

UNIQUE(user_id, product_id)

### Deal
| name | type | constrains |
| ---- | ---- | ---------- |
| deal_id| Integer | primary_key |
| user_id | Integer | ForeignKey(User) |
| product_id | Integer | ForeignKey(Product), ON DELETE CASCADE |
| date | timestamp | not null |

Информация о совершённых сделках.  

## Общие ограничения целостности
* Между таблицами `Product` и `Category`, `Product` и `User`, `Product` и `Location`,
`Picture` и `Product` отношение `Many to one`.
* Между таблицами `User` и `Product` отношение `Many to many` - `Booking`
# Пользовательские роли
## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?

User (Кол-во: неограничено)
* Создавать/редактировать/удалять свои объявления
* Просматривать количество человек в очереди на заказ
* Удалять людей из очереди на свой продукт
* Бронировать другие заказы

Staff (кол-во: 1-10)
* То же, что и `User`
* Редактировать/удалять все объявления
* Одобрять объявления
* Добавлять и удалять новых `Staff`
* Создавать/удалять/редактировать категории


# UI / API 
* UI -  React
* API - Python Flask
# Технологии разработки
## Язык программирования

* Backend - Python, sql
* Frontend - js, css, html

## СУБД
PostgreSQL
