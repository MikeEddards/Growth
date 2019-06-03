insert into child (
    parent_id,
    sex,
    first_name,
    last_name
)
values (
    ${parent_id},
    ${sex},
    ${first_name},
    ${last_name}
)
returning first_name, last_name, child_id;