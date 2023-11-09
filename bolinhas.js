let bolinhasHtml = '';
export function bolinhasDivs(id) {

    const conteudoBolinha = document.getElementById("conteudoBolinhas");

    if (id === 0) {
        bolinhasHtml = '';
    }

    for (let i = 0; i < id; i++) {

        let cor = '';
        if (id === 7) {
            cor = '#4f2828';
        } 
        else if (id % 2 != 0) {
            cor = '#444675';
        }else if (id % 2 === 0) {
            cor = '#612222';
        }



        bolinhasHtml += `<div class="bolinhas" style="background-color: ${cor};"></div>`;
        conteudoBolinha.innerHTML = bolinhasHtml;

        return;
    }

}