insert into age_data (
     parent_id,
     child_id,
     age,
     height,
     weight, 
     head_size, 
     image
)
values(
    ${parent_id},
    ${child_id}, 
    ${age}, 
    ${height}, 
    ${weight}, 
    ${head_size}, 
    ${image}
)
returning parent_id, child_id, age, height, weight, head_size, image;