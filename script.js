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
    resultContainer.style.display = "flex"; // Exibe a div .result

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

    // Criar o botão de "Voltar"
    const returnButton = document.createElement('button');
    returnButton.classList.add('glow-on-hover', 'return-button');
    returnButton.innerHTML = `<p>Sortear novamente</p><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 11.5858 21.5858 11.25 22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 17.937 17.937 22.75 12 22.75C6.06293 22.75 1.25 17.937 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C14.7937 1.25 17.339 2.31639 19.25 4.06269V2.5C19.25 2.08579 19.5858 1.75 20 1.75C20.4142 1.75 20.75 2.08579 20.75 2.5V6C20.75 6.41421 20.4142 6.75 20 6.75H16.5C16.0858 6.75 15.75 6.41421 15.75 6C15.75 5.58579 16.0858 5.25 16.5 5.25H18.3246C16.6699 3.69872 14.446 2.75 12 2.75Z" fill="white"/>
<path d="M15.9453 12.3577C15.7686 12.9844 14.9333 13.4273 13.2629 14.3131C11.648 15.1693 10.8406 15.5975 10.1899 15.4254C9.9209 15.3542 9.6758 15.2191 9.47812 15.0329C9 14.5827 9 13.7094 9 11.9629C9 10.2163 9 9.34307 9.47812 8.89284C9.6758 8.7067 9.9209 8.57157 10.1899 8.50042C10.8406 8.32833 11.648 8.75646 13.2629 9.61272C14.9333 10.4985 15.7686 10.9414 15.9453 11.5681C16.0182 11.8268 16.0182 12.099 15.9453 12.3577Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    resultContainer.appendChild(returnButton);

    // Funcionalidade do botão "Voltar"
    returnButton.addEventListener('click', function() {
        // Voltar para a tela principal
        program.classList.remove("delete");
        resultContainer.style.display = "none"; // Oculta os resultados
    });
});
