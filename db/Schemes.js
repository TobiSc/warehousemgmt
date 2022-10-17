import { createRealmContext, Realm } from "@realm/react";

export class Entity {
	_id;
	id;
	name;
	createdAt;
	parent;
	tags;
	description;
	images;

	static generate(id, name = "", parent) {
		return {
			_id: new Realm.BSON.ObjectId(),
			id,
			name,
			createdAt: new Date(),
			parent,
		};
	}

	static schema = {
		name: "Entity",
		primaryKey: "_id",
		properties: {
			_id: "objectId",
			id: "string",
			name: "string",
			createdAt: "date",
			parent: "Entity?",
			tags: "string[]",
			description: "string?",
			images: "string?",
		},
	};
}

const config = {
	schema: [Entity],
};

export const RealmContext = createRealmContext(config);

export const useRealm = RealmContext.useRealm;
export const useQuery = RealmContext.useQuery;
export const useObject = RealmContext.useObject;
