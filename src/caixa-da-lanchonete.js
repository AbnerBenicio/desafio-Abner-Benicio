/**
 *  @author Abner Benicio Silva
 *  Email: abnerbeniciosilva123@gmail.com
 *  Github: https://github.com/AbnerBenicio
 */

class CaixaDaLanchonete {
  //Inicializando classe com o cardapio

  constructor() {
    this.cardapio = [
      {
        cod: "cafe",
        descricao: "Café",
        valor: 3.0,
      },
      {
        cod: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
      },
      {
        cod: "suco",
        descricao: "Suco Natural",
        valor: 6.2,
      },
      {
        cod: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.5,
      },
      {
        cod: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
      },
      {
        cod: "salgado",
        descricao: "Salgado",
        valor: 7.25,
      },
      {
        cod: "combo1",
        descricao: "1 suco e 1 sanduíche",
        valor: 9.5,
      },
      {
        cod: "combo2",
        descricao: "1 café e 1 sanduíche",
        valor: 7.5,
      },
    ];
  }

  //Metodo para verificar se item pedido existe no cardapio

  verificaSeExiste(itens) {
    let l = this.cardapio.map((opcao) => opcao.cod);
    for (let idx = 0; idx < itens.length; idx++) {
      if (!l.includes(itens[idx].split(",")[0])) {
        return true;
      }
    }
  }

  //Metodo para calcular valor da compra

  calcularValorDaCompra(metodoDePagamento, itens) {
    //Inicializando variaveis

    let valor = 0; //valor da compra
    let verificaPrincipal; //validador de item principal
    let validadeDoPedido = true; //validador do pedido
    let pedidos = []; //lista de pedidos
    let quantidades = []; //lista de quantidades dos pedidos

    //Preenchendo lista de pedidos e quantidades
    itens.forEach((item) => {
      pedidos.push(item.split(",")[0]);
      quantidades.push(item.split(",")[1]);
    });

    //Verificacoes
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!"; //Se nao houver pedidos
    } else if (quantidades.includes("0")) {
      return "Quantidade inválida!"; //Se a quantidade de algum pedido for invalida
    } else if (this.verificaSeExiste(itens)) {
      return "Item inválido!"; //Se o pedido nao estiver no cardapio
    } else {
      //Se o pedido feito estiver no cardapio

      //Percorrendo pedidos
      pedidos.forEach((item, index) => {
        //Definindo quantidade por pedido
        let qntd = quantidades[index];

        //Percorrendo caradapio
        this.cardapio.forEach((opcao) => {
          //Encontrando item no cardapio

          if (opcao.cod === item) {
            //Verificando se o item é um extra

            if (opcao.descricao.includes("extra")) {
              //Se for, ele define validadorDoPedido como falso

              validadeDoPedido = false;

              //Percorrendo cardapio

              for (let i = 0; i < this.cardapio.length; i++) {
                //Comparando pedidos com o cardapio
                if (
                  !this.cardapio[i].descricao.includes("extra") &&
                  pedidos.includes(this.cardapio[i].cod) &&
                  opcao.descricao.includes(this.cardapio[i].descricao)
                ) {
                  //Se um dos pedidos for o principal do extra pedido

                  valor += opcao.valor * qntd; //Atribui o preco do item extra multiplicado à quantidade pedida ao valor
                  validadeDoPedido = true; //Define pedido como valido
                }
              }
            } else {
              //Caso o item não seja um extra

              valor += opcao.valor * qntd; //Atribui o preco do item multiplicado à quantidade pedida ao valor
              verificaPrincipal = true;
            }
          }
        });
      });
    }

    //Se houve pedido principal e o pedido é válido (sem extras ou com extras do principal)

    if (verificaPrincipal && validadeDoPedido) {
      //Verifica-se a forma de pagamento

      switch (metodoDePagamento) {
        case "debito":
          return `R$ ${valor.toFixed(2)}`.replace(".", ","); //Se for debito retorna o valor integral
          break;
        case "dinheiro":
          return `R$ ${(valor * 0.95).toFixed(2)}`.replace(".", ","); //Se for dinheiro retorna o valor com 5% de desconto
          break;
        case "credito":
          return `R$ ${(valor * 1.03).toFixed(2)}`.replace(".", ","); //Se for credito for credito retorna o valor com 3% de taxa
          break;
        default:
          return "Forma de pagamento inválida!"; //Se a forma de pagamento for inválida retorna erro
      }
    } else {
      //Se o pedido for invalido (Com item principal e com extra de outro item ou com extra sem principal)

      return "Item extra não pode ser pedido sem o principal"; //Retorna erro
    }
  }
}

export { CaixaDaLanchonete };
