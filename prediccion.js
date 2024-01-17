
var modelo = null;

//Cargar modelo

(async () => {
    console.log("Cargando modelo...");
    modelo = await tf.loadLayersModel("model.json");
    console.log("Modelo cargado...");
})();

function calcularIMC() {
    var altura = document.getElementById("altura").value;
    var peso = document.getElementById("peso").value;
    datos_imc = {
      altura: parseInt(altura),
      peso: parseInt(peso)
    };
  
    if (modelo != null) {
      let alturaTensor = tf.tensor(datos_imc.altura);
      let pesoTensor = tf.tensor(datos_imc.peso);
  
      // Agrega una dimensión a los tensores
      alturaTensor = tf.expandDims(alturaTensor, 0);
      pesoTensor = tf.expandDims(pesoTensor, 0);
  
      var prediccion = modelo.predict([alturaTensor, pesoTensor]).dataSync();
      prediccion = Math.round(prediccion, 1);
  
      document.getElementById("resultado").innerHTML = "Tu IMC es " + prediccion;
    } else {
      document.getElementById("resultado").innerHTML = "Intenta de nuevo en un momento...";
    }
  }
  