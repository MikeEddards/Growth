insert into users (username,
            password,
            email,
            first_name,
            last_name)
            
            values(
                ${username},
                ${password},
                ${email},
                ${first_name},
                ${last_name}
            )
            returning username, id;