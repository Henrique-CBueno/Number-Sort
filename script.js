document.querySelector('.glow-on-hover').addEventListener('click', function() {
    // Capturar os valores dos campos de entrada
    const numCount = parseInt(document.getElementById('numbers').value);
    const rangeStart = parseInt(document.getElementById('range1').value);
    const rangeEnd = parseInt(document.getElementById('range2').value);

    // Verificar se os valores são válidos
    if (isNaN(numCount) || isNaN(rangeStart) || isNaN(rangeEnd) || numCount <= 0 || rangeStart >= rangeEnd) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Verificar se a opção "Não repetir número" está marcada
    const noRepeat = document.querySelector('.toogle input').checked;

    // Se o "Não repetir número" estiver ativo, verificar se o número de números a sortear é maior que o intervalo possível
    if (noRepeat) {
        const availableNumbers = rangeEnd - rangeStart + 1;
        if (numCount > availableNumbers) {
            alert(`Não é possível sortear ${numCount} números únicos em um intervalo de ${availableNumbers} números.`);
            return;
        }
    }

    // Função para gerar números aleatórios
    const generateRandomNumbers = (count, start, end, noRepeat) => {
        const numbers = [];
        while (numbers.length < count) {
            let randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
            if (noRepeat) {
                if (!numbers.includes(randomNumber)) {
                    numbers.push(randomNumber);
                }
            } else {
                numbers.push(randomNumber);
            }
        }
        return numbers;
    };

    // Gerar números aleatórios
    const randomNumbers = generateRandomNumbers(numCount, rangeStart, rangeEnd, noRepeat);

    // Ocultar a div .principal
    const program = document.querySelector(".principal");
    program.classList.add("delete");

    // Selecionar a div .result
    const resultContainer = document.querySelector(".result");

    // Limpar resultados anteriores
    resultContainer.innerHTML = '';

    // Criar e adicionar os números na tela
    randomNumbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('numbers');
        numberDiv.innerHTML = `
            <div class="numb">
                <h1>${number}</h1>
            </div>
        `;
        resultContainer.appendChild(numberDiv);
    });
});
