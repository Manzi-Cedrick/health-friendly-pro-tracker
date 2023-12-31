import serial
import requests

ser = serial.Serial("/dev/cu.usbserial-1120", 9600, timeout=1)

# API endpoint URL
api_url = "http://localhost:8080/records"

try:
    while True:
        data = ser.readline().decode().strip()
        if data:
            print(data);
            if "Patient ID:" in data and "Heart Rate:" in data and "Body Temperature:" in data:
                # Split the data string into components
                components = data.split(" && ")
                # Extract patient ID, heart rate and body temperature
                patient_id = components[0].split(": ")[1]
                heart_rate = float(components[1].split(": ")[1])
                body_temperature = float(components[2].split(": ")[1])

                if 40 <= heart_rate <= 160:
                    request_body = {"patient_id": patient_id, "heart_rate": int(float(heart_rate)), "body_temperature": int(float(body_temperature))}
                    response = requests.post(api_url, json=request_body)
                    print(response.status_code)
                    if response.status_code == 201:
                        print(response.json())
                        print('Data uploaded successfully!')
                    else:
                        print("Failed to upload data")
except KeyboardInterrupt:
    print("Serial communication interrupted.")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
finally:
    ser.close()