package utils

import (
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
)

func BsonFieldExtractor[T any](obj T) bson.M {
	updateFields := bson.M{}

	val := reflect.ValueOf(obj).Elem() // Получаем значение структуры

	for i := 0; i < val.NumField(); i++ {
		field := val.Type().Field(i)
		value := val.Field(i)
		if value.IsValid() && !value.IsZero() {
			updateFields[field.Tag.Get("bson")] = value.Interface() // используем тег bson для получения имени поля
		}
	}
	return updateFields
}
