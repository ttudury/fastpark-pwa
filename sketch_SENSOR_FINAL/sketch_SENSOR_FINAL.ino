int TRIG = 10;
int ECO = 9;
int duration = 0;
int distance = 0;
int numSensor = 1;

void setup() {
  // put your setup code here, to run once:
  pinMode(TRIG, OUTPUT);
  pinMode(ECO, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(TRIG, HIGH);
  delay(1);
  digitalWrite(TRIG, LOW);
  duration = pulseIn(ECO, HIGH);
  distance = duration / 58.2;//valor especificado por el fabricante
  
  if(distance<10){
    Serial.println("ocupado");
  }else{
    Serial.println("libre");
  }
  
  //Serial.println(distance);
  delay(5000);//espero 5 segundos
}
