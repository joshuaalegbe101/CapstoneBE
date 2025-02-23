UserSchema {
	name:
	email:
	password
}

TransactionSchema {
	userId,
	type,
	cateogory,
	amount,
	date,
	note,
}

BudgetSchema {
	userID,
	limit,
	startDate,
	endDate,
}
