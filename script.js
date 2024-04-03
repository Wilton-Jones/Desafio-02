async function acessarCep(cep) {
  console.log("acessarCep");
  try {
    // Mostrar feedback de carregamento
    document.getElementById("rua").textContent = "Carregando...";
    document.getElementById("bairro").textContent = "Carregando...";
    document.getElementById("cidade").textContent = "Carregando...";

    const response1 = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response1.ok) {
      throw new Error("CEP não encontrado ou inválido");
    }
    const data1 = await response1.json();

    // Verificar se os campos de endereço estão presentes
    if (!data1.logradouro || !data1.bairro || !data1.localidade) {
      throw new Error("Informações de endereço ausentes");
    }
    console.log(data1);

    // Atualizar os elementos HTML com os dados do endereço
    document.getElementById("rua").textContent = data1.logradouro;
    document.getElementById("bairro").textContent = data1.bairro;
    document.getElementById("cidade").textContent = data1.localidade;
  } catch (error) {
    // Exibir mensagens de erro específicas
    document.getElementById("rua").textContent = "Erro: " + error.message;
    document.getElementById("bairro").textContent = "Erro: " + error.message;
    document.getElementById("cidade").textContent = "Erro: " + error.message;
  }
}

async function previsaoTempo(latitude, longitude) {
  console.log("previsaoTempo");

  try {
    // Mostrar feedback de carregamento
    document.getElementById("previsao").textContent = "Carregando...";

    const response2 = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    );
    if (!response2.ok) {
      throw new Error("Erro ao carregar a API");
    }
    const data2 = await response2.json();

    // Verificar se os campos de endereço estão presentes
    if (!data2.latitude || !data2.longitude) {
      throw new Error("Informações de previsão ausentes");
    }
    console.log(data2);

    // Verificar se há pelo menos um item na matriz antes de tentar acessar o primeiro item, em seguida
    // atualizar o elemento HTML com os dados obtidos
    if (data2.hourly.temperature_2m.length > 0) {
      document.getElementById("previsao").innerHTML =
        data2.hourly.temperature_2m[0] + "° C";
    }
  } catch (error) {
    // Exibir mensagens de erro específicas
    document.getElementById("previsao").textContent = "Erro: " + error.message;
  }
}


// Adicionando evento de submissão ao formulário
const submitForm = async (event) => {
  event.preventDefault(); // Evitar envio padrão do formulário

  const cep = document.getElementById("cep").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  await acessarCep(cep);
  await previsaoTempo(latitude, longitude);
};
