import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Radar from "./components/UI/Radar/Radar";
import ControllerButtons from "./components/UI/ControllerButtons/ControllerButtons";
import { useState, useRef } from "react";

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [isRadarActive, setIsRadarActive] = useState(false);
  const intervalRef = useRef(null);

  const handleDirectionHold = (direction) => {
    if (!isRadarActive) return;

    intervalRef.current = setInterval(() => {
      setRotation((prev) => {
        if (direction === "Left") {
          return Math.max(prev - 1.8, -180);
        } else if (direction === "Right") {
          return Math.min(prev + 1.8, 180);
        }
        return prev;
      });
    }, 100); // Update every 100ms for smooth movement
    return () => clearInterval(intervalRef.current);
  };

  const handleDirectionRelease = (clearInterval) => {
    if (clearInterval) clearInterval();
  };

  const handleStartPress = (isActive) => {
    setIsRadarActive(isActive);
    if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.radarContainer}>
        <Radar manualRotation={rotation} isActive={isRadarActive} />
      </View>
      <View style={styles.buttonContainer}>
        <ControllerButtons
          onDirectionHold={handleDirectionHold}
          onDirectionRelease={handleDirectionRelease}
          onStartPress={handleStartPress}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  radarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
