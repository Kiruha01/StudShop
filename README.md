# Описание

Сайт представляет собой площадку, где каждый студент может выложить на продажу какую-нибудь
вещь. После одобрения объявления, оно попадает в ленту недавних объявлений, а также в основные 
категории сайта, такие как **Одежда**, **Книги** и т.д. 

Есть возможность забронировать товар. При этом он пометиться, как забронированный и хозяину
будет отправленно электронное письмо о бронировании. Однако, другие пользователи могут также продолжать бронировать товар, вставая в очередь, если человек перед ними откажется. 

Ссылка на способ связи становится доступна первому человеку в очереди. Если человек впереди тебя в очереди отзывает бронь, тебе на почту приходит соответствующее письмо со ссылкой для связи с продавцом.

Авторизация происходит через студенческий Google-аккаунт СПбГУ.

## Наименование

StudShop

## Предметная область

Студенческий интернет-магазин

# Данные
## Для каждого элемента данных - ограничения
### User
| name | type | constrains |
| ---- | ---- | ---------- |
| id   | Integer|  primary_key|
| email| String(100)| unique, not null|
| name | String(100)| nullable |
| com_method | String(100) | not null |
|tokens| Text | |
| is_stuff| Boolean | not null |
| num_deals | Integer | not null, default=0 |

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
|price | Money | not null |
|description | Text | |
|category_id | Integer | ForeignKey(Category), nullable |
|location_id|Integer| ForeignKey(Location), not null|
|owner_id | Integer |ForeignKey(User), not null |


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
| time | timestamp | not null |

UNIQUE(user_id, product_id)

## Общие ограничения целостности
* Между таблицами `Product` и `Category`, `Product` и `User`, `Product` и `Location` отношение `Many to one`. Между `Product` и `Picture` - `One to many`
* Между таблицами `User` `Product` отношение `Many to many` - `Booking`
# Пользовательские роли
## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?

User (Кол-во: неограничено)
* Создавать/редактировать/удалять свои объявления
* Просматривать количество человек в очереди на заказ и информацию на первого в очереди
* Бронировать другие заказы

Stuff (кол-во: 1-10)
* То же, что и `User`
* Редактировать/удалять все объявления
* Одобрять объявления
* Добавлять и удалять новых `Stuff`


# UI / API 
* UI -  React
* API - Python Flask
# Технологии разработки
## Язык программирования

* Backend - Python, sql
* Frontend - js, css, html

## СУБД
PostgreSQL
