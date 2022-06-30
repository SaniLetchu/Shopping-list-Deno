# Project 1: Shared shopping list

## Description

Web application built with Deno and PostgreSQL. The application uses a
three-tier architecture (client, server, database) and a layered architecture
with four layers (views, controllers, services, database).

The application can create and store shopping lists and items inside the lists.

### Main page

Has a link to Lists page. Displays information about the counts of all the lists
and items

### Shopping lists

Has a link to Main page. Has a form for creating new shopping lists. Displays
active shopping list in a list that can be deactivated or accessed to see what
items are inside a list.

### Items

Has a link to Shopping lists. Has a form for creating new items. The items in
the shopping list are shown in alphabetic order so that the list first contains
all uncollected items in alphabetic order, followed by all collected items in
alphabetic order. Items can be marked as collected.

## Deployment

The application has been deployed using
[Heroku](https://shopping-list1.herokuapp.com/)

## Local Deployment

To run the application locally you need to have installed Deno and
Docker-compose.

Running the application: **docker-compose up**

Accessing the application: **http://localhost:7777/**
