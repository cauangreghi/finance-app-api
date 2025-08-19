import { PostgresHelper } from "../../db/postgres/helper"
export class PostgresDeleteUser {
    execute(userId) {
        const deletedUser = PostgresHelper.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [userId],
        )
        return deletedUser[0]
    }
}
