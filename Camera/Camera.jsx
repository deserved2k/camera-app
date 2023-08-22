import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function CameraScreen({ navigation}){
    const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // Initialize with "off"
  const cameraRef = useRef(null);

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Media Library permission not granted");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleTorch() {
    setFlashMode((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      await savePictureToMediaLibrary(photo.uri);
    }
  }

  const savePictureToMediaLibrary = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log("Image saved to media library", asset);
    } catch (error) {
      console.log("Error saving image to media library", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCameraType}>
            
            <Ionicons
              name={
                type === CameraType.back
                  ? "camera-reverse-outline"
                  : "camera-outline"
              }
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Feather name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1,
      alignSelf: "flex-start",
      flex:1,
      alignItems: "center",
      justifyContent:"center"}}><Button  title="Photos" onPress={() => navigation.navigate('Media',)}/></TouchableOpacity>
          
          <TouchableOpacity
            style={{ paddingTop: 20 }}
            onPress={toggleTorch} // Toggle the torch with a single button press
          >
            <Feather
              name={
                flashMode === Camera.Constants.FlashMode.off ? "zap-off" : "zap"
              }
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    text: {
      fontSize: 12,
      fontWeight: "bold",
      color: "white",
    },
  });
  