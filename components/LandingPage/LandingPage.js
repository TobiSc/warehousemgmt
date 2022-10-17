import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from "react-native";
import EntityList from "./EntityList/EntityList";

import { useRealm } from "../../db/Schemes";
import { GlobalStyle } from "../GlobalStyle";
import { get } from "lodash";
import QRGeneratorModal from "./QRGeneratorModal/QRGeneratorModal";

const start = `<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">`;

const end = `</body>
</html>`;

export default function LandingPage({ route, navigation }) {
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const { hasResult, result } = route.params || {};
  const realm = useRealm();

  useEffect(() => {
    if (hasResult) {
      addToDatabase(result);
      navigation.setParams({ hasResult: false });
    }
  }, [result]);

  const addToDatabase = (data) => {
    let entries = Array.isArray(data) ? data : [data];
    for (let entry of entries) {
      realm.write(() => {
        realm.create("Entity", { _id: entry, name: "test" }, "modified");
      });
    }
    console.log(
      "Database:",
      realm.objects("Entity").map((e) => e._id)
    );
  };

  return (
    <View style={GlobalStyle.viewContainer}>
      <EntityList />
      <View style={styles.fixedBottomButton}>
        <Button
          onPress={() => {
            setPrintModalOpen(true);
          }}
          title="Neue QR-Codes erstellen"
        />
        <Button
          title="Barcode scannen"
          onPress={() => navigation.navigate("ScanPage")}
        />
      </View>
      <QRGeneratorModal
        modalVisible={printModalOpen}
        setModalVisible={setPrintModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixedBottomButton: {
    position: "absolute",
    left: 12,
    bottom: 12,
    width: "100%"
  },
})