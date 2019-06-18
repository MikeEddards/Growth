select  DISTINCT *
from child ch
join age_data da
on ch.child_id = da.child_id
where ch.parent_id = ${parent_id} and da.parent_id = ${parent_id}
order by age ASC
;