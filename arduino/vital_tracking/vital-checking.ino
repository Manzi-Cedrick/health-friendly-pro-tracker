#include <OneWire.h>
#include <DallasTemperature.h>

#define samp_siz 4
#define rise_threshold 4
#define ONE_WIRE_BUS 2 

int sensorPin = 0;
float first, second, third, before, print_value;
long int last_beat;
float offsetCorrection = 10;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup()
{
  Serial.begin(9600);
  sensors.begin();
  sensors.setResolution(12);
}

void loop()
{
  String patient_id = "d637b1ea-df0b-4f4d-9047-fb5f73408223";
  Serial.print("Recording records for patient with id: ");
  Serial.println(patient_id);
  Serial.println("=======================================");
  for (;;)
  {
    float avgHeartRate = getHeartRate();
    float temperature = getTemperatureInfo();
    formulateRequestData(patient_id, avgHeartRate, temperature);
    delay(3000);
  }

  delay(2000);
}

float getHeartRate()
{
  float reads[samp_siz], sum;
  long int now, ptr;
  float last, reader, start;
  bool rising;
  int rise_count;
  int n;

  for (int i = 0; i < samp_siz; i++)
    reads[i] = 0;
  sum = 0;
  ptr = 0;
  float total = 0;
  int count = 0;

  long int start_time = millis();
  while (millis() < start_time + 5000) // average heart rate in 5 seconds
  {
    n = 0;
    start = millis();
    reader = 0.;
    do
    {
      reader += analogRead(sensorPin);
      n++;
      now = millis();
    } while (now < start + 20);
    reader /= n; // we got an average

    sum -= reads[ptr];
    sum += reader;
    reads[ptr] = reader;
    last = sum / samp_siz;

    if (last > before)
    {
      rise_count++;
      if (!rising && rise_count > rise_threshold)
      {
        rising = true;
        first = millis() - last_beat;
        last_beat = millis();

        print_value = 60000. / (0.4 * first + 0.3 * second + 0.3 * third);

        total += print_value;
        count++;

        third = second;
        second = first;
      }
    }
    else
    {
      rising = false;
      rise_count = 0;
    }
    before = last;
    ptr++;
    ptr %= samp_siz;
  }

  return total / count;
}

float getTemperatureInfo()
{
  sensors.requestTemperatures();                                      
  delay(750);                                                      
  float temperatureC = sensors.getTempCByIndex(0) + offsetCorrection; 
  return temperatureC;
}

void formulateRequestData(String patient_id, float heart_rate, float temperature)
{
  Serial.println();
  Serial.print("Patient ID: ");
  Serial.print(patient_id);
  Serial.print(" && Heart Rate: ");
  Serial.print(heart_rate);
  Serial.print(" && Body Temperature: ");
  Serial.print(temperature);
}