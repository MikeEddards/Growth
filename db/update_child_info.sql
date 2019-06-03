UPDATE child set first_name = ${first_name}
where parent_id = ${parent_id} and child_id = child_id;

UPDATE child set last_name = ${last_name}
where parent_id = ${parent_id} and child_id = child_id;