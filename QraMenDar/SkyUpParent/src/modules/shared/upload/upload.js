import { getStore } from "./../../../modules/store";
import config from "./../../../config/index";
import { Platform } from "react-native";

export default class UploadFile {
  static validate(file, schema) {
    return true;
  }

  createFormData = (photo) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android"
          ? photo.uri
          : photo.uri.replace("file://", ""),
    });

    return data;
  };

  static async uploadFromRequest(photo) {
    let token = getStore().getState().auth.jwt_token;
    let id = getStore().getState().auth.currentUser.id;

    const formData = new FormData();

    formData.append("file", {
      name: photo.fileName,
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? photo.uri
          : photo.uri.replace("file://", ""),
    });
    let response = await fetch(`https://auth.skiliks.net/storage/upload`, {
      headers: {
        Authorization: `Bearer ${token}`,
        path: `${photo.path}${id}/${photo.fileName}`,
      },
      method: "POST",
      body: formData,
    });

    let responseAsJson = await response.json();

    return responseAsJson;
  }
  static async getPath(avatar) {
    if (avatar == null) {
      return null;
    } else if (avatar.key) {
      let token = getStore().getState().auth.jwt_token;

      let res = await fetch(
        `${config.storageApi}/fn/get-download-url/${avatar.key}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      let newToken = await res.json();
      if (avatar && avatar.token) {
        return {
          uri: `${config.storageApi}/file/${avatar.key}?token=${newToken.token}`,
        };
      }

      return "";
    } else {
      return {
        uri: avatar.uri,
      };
    }
  }
}
