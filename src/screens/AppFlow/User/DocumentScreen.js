import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { DataStore, Storage } from "aws-amplify";
import uuid from "react-native-uuid";
import {
  DocumentDetailsNurse,
  NurseNotificationTable,
  NurseTable,
} from "../../../models";
import moment from "moment";
import { S3Image } from "aws-amplify-react-native";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendNewPushNotification } from "../../../utils/notification";

const DocumentScreen = (props) => {
  const { width, height } = Dimensions.get("window");

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const id = props !== undefined && props?.route?.params?.data?.id;

  console.log(id);

  const [userDocument, setUserDocument] = useState(undefined);
  const [noShowModel, setNoShowModel] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [noShowMessage, setNoShowMessage] = useState("");
  const [uploadDocView, setUploadDocView] = useState({
    document_type: "",
    document_name: "",
    issuing_body: "",
    expiration_date: "",
    document_front_image: "",
    document_back_image: "",
    document_upload_with_all_pages: [],
    document_verified: false,
    file: "",
    verification_note: "",
    status: "",
  });

  const downloadAndOpenPDF = async (name) => {
    // Download the PDF file to the device's file system

    const response = await Storage.get(name, {
      level: "public/",
    });
    // const localUri = FileSystem.documentDirectory + "filename.pdf";

    // await FileSystem.writeAsStringAsync(localUri, response.Body, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });
    // return localUri;
    Linking.openURL(response.toString());
  };

  const currentDate = moment();

  useEffect(() => {
    setUploadDocView({
      ...uploadDocView,
      document_type: userDocument?.document_type,
      document_name: userDocument?.document_name,
      issuing_body: userDocument?.issuing_body,
      expiration_date: moment(new Date(userDocument?.expiration_date)),
      document_front_image: userDocument?.document_front_image,
      document_back_image: userDocument?.document_back_image,
      document_upload_with_all_pages:
        userDocument?.document_upload_with_all_pages,
      document_verified: userDocument?.document_verified,
      file: userDocument?.file,
      verification_note: userDocument?.verification_note,
      status: userDocument?.status,
    });

    const expirationDate = moment(userDocument?.expiration_date);

    if (userDocument?.document_type === "Assessment") {
      const monthsDifference = currentDate.diff(expirationDate, "months");
      setIsExpired(monthsDifference >= 36);
    } else if (userDocument?.document_type === "Health Document") {
      const monthsDifference = currentDate.diff(expirationDate, "months");
      setIsExpired(monthsDifference >= 12);
    } else if (userDocument?.document_type === "Misc Documents") {
      const monthsDifference = currentDate.diff(expirationDate, "months");
      setIsExpired(monthsDifference >= 12);
    } else {
      setIsExpired(expirationDate <= currentDate);
    }
  }, [userDocument]);

  const updateData = async (status, message) => {
    if (noShowMessage === "") {
      Alert.alert("Fill the verification note");
    } else {
      try {
        const res = await DataStore.save(
          DocumentDetailsNurse.copyOf(userDocument, (updated) => {
            updated.document_verified = true;
            updated.status = status;
            updated.verification_note = message;
          })
        );
        const data = await DataStore.query(NurseTable, (item) =>
          item.id.eq(res.nurseTableID)
        );
        setNoShowMessage("");
        setNoShowModel(false);
        await DataStore.save(
          new NurseNotificationTable({
            imageURL: "",
            title: "Document Verification Status",
            content: "Your Document is" + ` ${status}`,
            navigationScreen: "MyDocumentsScreen",
            navigationData: {},
            visited: false,
            visitNotification: false,
            notificationDotTypeColor: "green",
            nurseTableID: res.nurseTableID,
            url: "",
          })
        );
        sendNewPushNotification({
          expoPushToken: data[0]?.mobileId,
          job: "Document Verification Status",
          typeMessage: "Your Document is" + ` ${status}`,
          screen: "MyDocumentsScreen",
        });
        // setNoShowMessage("");
        // setNoShowModel(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const check = async (id) => {
    setLoading(true);
    try {
      const data = await DataStore.query(DocumentDetailsNurse, (item) =>
        item.id.eq(id)
      );
      setUserDocument(data[0]);
      setLoading(false);
    } catch (error) {
      setUserDocument(null);
    }
  };

  useEffect(() => {
    check(id);
  }, [id]);

  //DocumentDetailsNurse Update
  useEffect(() => {
    const subscription = DataStore.observe(DocumentDetailsNurse, (item) =>
      item.id.eq(id)
    ).subscribe((msg) => {
      if (msg.model === DocumentDetailsNurse && msg.opType === "UPDATE") {
        check(id);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.container}>
            <View
              style={{
                justifyContent: "center",
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Document Type
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {uploadDocView?.document_type}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Document Name
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {uploadDocView?.document_name}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  {uploadDocView?.document_type === "Assessment" ||
                  uploadDocView?.document_type === "Health Document"
                    ? "Date Completed"
                    : uploadDocView?.document_type === "Misc Documents"
                    ? "Submission Date"
                    : "Expiration Date"}
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {moment(new Date(uploadDocView.expiration_date)).format(
                    "MMMM D, YYYY"
                  )}
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{ color: "#1a1a1a", fontWeight: "500", fontSize: 15 }}
                >
                  Valid Until
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {uploadDocView.document_type === "Assessment"
                    ? moment(new Date(uploadDocView.expiration_date))
                        .add(36, "months")
                        .format("MMMM D, YYYY")
                    : uploadDocView.document_type === "Health Document"
                    ? moment(new Date(uploadDocView.expiration_date))
                        .add(12, "months")
                        .format("MMMM D, YYYY")
                    : uploadDocView.document_type === "Misc Documents"
                    ? moment(new Date(uploadDocView.expiration_date))
                        .add(12, "months")
                        .format("MMMM D, YYYY")
                    : moment(new Date(uploadDocView.expiration_date)).format(
                        "MMMM D, YYYY"
                      )}
                </Text>
              </View>

              {uploadDocView?.document_upload_with_all_pages?.length > 0 && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#f2f2f2",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "500",
                        fontSize: 15,
                      }}
                    >
                      Document Images
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {uploadDocView?.document_upload_with_all_pages.map(
                      (item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              borderWidth: 2,
                              marginTop: 5,
                              borderRadius: 10,
                              borderColor: "#2775BD",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#fff",
                              width: width / 3,
                              overflow: "hidden",
                              margin: 2,
                            }}
                          >
                            <S3Image
                              imgKey={item}
                              style={{
                                borderRadius: 10,
                                aspectRatio: 2 / 3,
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        );
                      }
                    )}
                  </View>
                </View>
              )}

              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1.5,
                  borderBottomColor: "#f2f2f2",
                }}
              >
                <Text
                  style={{
                    color: "#1a1a1a",
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  {uploadDocView?.document_type === "Misc Documents"
                    ? "Submission Notes"
                    : "Issuing Body"}
                </Text>
                <Text style={{ color: "#595959", fontSize: 12, marginTop: 5 }}>
                  {uploadDocView?.issuing_body}
                </Text>
              </View>

              {uploadDocView.document_front_image && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#f2f2f2",
                  }}
                >
                  <Text
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Document Front Side
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: 2,
                      marginTop: 5,
                      borderRadius: 10,
                      borderColor: "#2775BD",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      width: width / 2.5,
                      overflow: "hidden",
                    }}
                  >
                    {uploadDocView?.document_front_image !== "" && (
                      <View>
                        <S3Image
                          imgKey={uploadDocView?.document_front_image}
                          style={{
                            borderRadius: 10,
                            aspectRatio: 4 / 3,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}

              {uploadDocView.document_back_image && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#f2f2f2",
                  }}
                >
                  <Text
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Document Back Side
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: 2,
                      marginTop: 5,
                      borderRadius: 10,
                      borderColor: "#2775BD",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      width: width / 2.5,
                      overflow: "hidden",
                    }}
                  >
                    {uploadDocView?.document_back_image !== "" && (
                      <View>
                        <S3Image
                          imgKey={uploadDocView?.document_back_image}
                          style={{
                            borderRadius: 10,
                            aspectRatio: 4 / 3,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}

              {uploadDocView.file && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontWeight: "500",
                        fontSize: 15,
                      }}
                    >
                      Document File
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f2f2f2",
                      borderRadius: 5,
                      elevation: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      justifyContent: "space-between",
                    }}
                    onPress={() => downloadAndOpenPDF(uploadDocView.file)}
                  >
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: 12,
                        color: "#8888",
                        marginHorizontal: 10,
                      }}
                    >
                      View the file
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {uploadDocView?.verification_note && (
                <View
                  style={{
                    marginVertical: 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#f2f2f2",
                  }}
                >
                  <Text
                    style={{
                      color: "#1a1a1a",
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    Notes
                  </Text>
                  <Text
                    style={{ color: "#595959", fontSize: 12, marginTop: 5 }}
                  >
                    {uploadDocView?.verification_note}
                  </Text>
                </View>
              )}

              {isExpired ? (
                <View
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: "red",
                    borderRadius: 5,
                    padding: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Expired
                  </Text>
                </View>
              ) : !uploadDocView.document_verified ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: "#2775BD",
                    borderRadius: 5,
                    padding: 10,
                    marginHorizontal: 10,
                    marginTop: 5,
                  }}
                  onPress={() => setNoShowModel(true)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Verify
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  activeOpacity={0.5}
                  style={{
                    backgroundColor:
                      uploadDocView?.status === "Approved" ? "#00b359" : "red",
                    borderRadius: 5,
                    marginHorizontal: 10,
                    padding: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {uploadDocView?.status}
                  </Text>
                </View>
              )}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={noShowModel}
              onRequestClose={() => setNoShowModel(false)}
            >
              <View
                style={{
                  height: height,
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 15,
                    marginTop: 100,
                    width: 300,
                    justifyContent: "center",
                    elevation: 5,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginBottom: 5,
                        fontSize: 12,
                        color: "#737373",
                        marginHorizontal: 10,
                      }}
                    >
                      Verification Note <Text style={{ color: "red" }}>*</Text>
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#f2f2f2",
                        borderRadius: 10,
                        elevation: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#e6e6e6",
                        marginHorizontal: 10,
                        paddingRight: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "90%",
                          padding: 2,
                          paddingLeft: 5,
                          fontSize: 12,
                          color: "#737373",
                        }}
                        multiline
                        onChangeText={(text) => setNoShowMessage(text)}
                        value={noShowMessage}
                        keyboardType={"default"}
                        autoCapitalize="sentences"
                        placeholderTextColor="#b3b3b3"
                        placeholder={"Verification Message"}
                      />
                      <View
                        style={{
                          height: 40,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {noShowMessage ? (
                          <TouchableOpacity
                            onPress={() => setNoShowMessage("")}
                            style={{ marginLeft: 3 }}
                          >
                            <Ionicons
                              name="close-sharp"
                              size={22}
                              color="#808080"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setNoShowModel(false);
                        setNoShowMessage("");
                      }}
                      style={{
                        backgroundColor: "#2775BD",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateData("Not Approved", noShowMessage)}
                      style={{
                        backgroundColor: "red",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Not Approved
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateData("Approved", noShowMessage)}
                      style={{
                        backgroundColor: "#00b359",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 12,
                          color: "#fff",
                        }}
                      >
                        Approve
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
