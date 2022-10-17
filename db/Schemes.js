import { createRealmContext } from "@realm/react";

export class Entity {
  _id;
  description;
  isComplete;
  createdAt;

  static generate(_id, name = "") {
    return {
      _id,
      name,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: "Entity",
    primaryKey: "_id",
    properties: {
      _id: "string",
      name: "string",
      createdAt: "date",
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
