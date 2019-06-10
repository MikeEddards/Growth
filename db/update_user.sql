update users set email = ${email}
where id = ${id};

update users set first_name = ${first_name}
where id = ${id};

update users set last_name = ${last_name}
where id = ${id};

update users set image = ${image}
where id = ${id};

SELECT email, first_name, last_name, image from users
where id = ${id};