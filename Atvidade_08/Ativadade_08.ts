/*1. As classes Carro, Veiculo e CarroEletrico são bem semelhantes. Refatore as
classes para que os atributos duplicados não sejam mais necessários.*/

class Veiculo {
    private _placa:string;
    private _ano:number;

    constructor(_placa:string,_ano: number) {
        this._placa =_placa;
        this._ano =_ano;
	}
	
		get placa(): string {
		return this._placa;
		}

		get ano(): number {
		return this._ano;
		}
}
	let vehicle : Veiculo = new Veiculo("BCA-1021", 2010);
	console.log(vehicle);

	class Carro extends Veiculo {
    constructor(placa:string,ano:number,private _modelo:string) {
      super(placa,ano)
	}
	get modelo():string{
		return this._modelo;
	}
}

	let Car : Carro = new Carro("CAZ-0192", 2016,"Supra-Toyata");
	console.log(Car);

	class CarroEletrico extends Carro {
		constructor(placa:string,ano:number,modelo:string,private _autonomiaBateria:number) {
			super(placa,ano,modelo)
		  }
		  get autonomiaBateria():number{
			  return this._autonomiaBateria;
		  }
	}


	let Electric_car: CarroEletrico = new CarroEletrico("ELW-1029",2021,"Toyota BZ",394);
	console.log(Electric_car);

/*2. Crie uma classe Calculadora com:
a. Dois tributos privados chamados _op1 e _op2;
b. Crie um construtor que inicializa os atributos;
c. Crie um método chamado adicionar que retorna a soma dos dois atributos;
d. Teste a classe.*/
class Calculadora {
    private _op1:number;
    private _op2:number;

    constructor(_op1: number, _op2: number) {
        this._op1=_op1;
        this._op2=_op2;
	}
	
	get op1(): number {
		return this._op1;
	}

	get op2(): number {
		return this._op2;
	}
	public adicionar(): number {
    return this._op1+this._op2;
	}
}
let operação :Calculadora = new Calculadora(1,100);
console.log(operação );
console.log(operação.adicionar());

/*3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
do exercício passado e:
a. Implemente um método chamado exponenciar que retorne o _op1 elevado
ao _op2;
b. Teste a classe;
c. Foi necessária alguma modificação em Calculadora para o acesso aos
atributos?*/

class CalculadoraCientifica extends Calculadora {
	constructor(_op1: number, _op2: number) {
		super(_op1,_op2);
	}
	public exponenciar (): number {
    return this.op1**this.op2;
	}
}

let operaçãoCien :CalculadoraCientifica= new CalculadoraCientifica(16,10);
console.log(operaçãoCien );
console.log(operaçãoCien.exponenciar());


/*4. Implemente na classe Banco o método renderJuros(numero: String): number,
onde:
a. É passado por parâmetro o número de uma poupança e feita uma consulta
para ver se a conta existe. Note que a consulta não se altera sendo Conta
ou Poupança;
b. Caso a poupança seja encontrada, teste se realmente se trata de uma
poupança com o operador instanceof, desconsidere a operação caso
contrário;
c. Caso seja, faça um cast e invoque o método renderJuros da própria
instância encontrada;
d. Teste o método da classe Banco passando tanto um número de poupança
como de conta passados inseridos anteriormente.*/

class Conta {
	private _numero: String;
	private _saldo: number;

    constructor(numero: String, saldoInicial: number) {
		this._numero = numero;
		this._saldo = saldoInicial;
	}
	
	get numero(): String {
		return this._numero;
	}

	get saldo(): number {
		return this._saldo;
	}
	
	sacar(valor: number): void {
		if (this._saldo >= valor) {
			this._saldo = this._saldo - valor;
		}
	}

	depositar(valor: number): void {
		this._saldo = this._saldo + valor;
	}

	transferir(contaDestino: Conta, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}
}

class Poupanca extends Conta {
	private _taxaJuros: number;

	constructor(numero: String, saldo: number, taxaJuros: number ) {
		super(numero, saldo);
		this._taxaJuros = taxaJuros;
	}

	public renderJuros(): void {
		this.depositar(this.saldo * this._taxaJuros/100);
	}

	get taxaJuros(): number {
		return this._taxaJuros
	}
}

let conta: Conta = new Conta("1", 100);
let poupanca: Poupanca = new Poupanca("2",100,0.5);
poupanca.renderJuros();
console.log(poupanca.saldo);

let poupanca2: Conta = new Poupanca("3",100, 1);
poupanca2.depositar(100);
(<Poupanca> poupanca2).renderJuros();
console.log(poupanca2.saldo);



class Banco {
	private _contas: Conta[] = [];
	
	inserir(conta: Conta): void {
        let contaConsultada = this.consultar(conta.numero);

        if (contaConsultada == null) {
		    this._contas.push(conta);
        }
	}

	consultar(numero: String): Conta {
		let contaConsultada: Conta;
		for (let conta of this._contas) {
			if (conta.numero == numero) {
				contaConsultada = conta;
				break;
			}
		}
		return contaConsultada;
	}

	private consultarPorIndice(numero: String): number {
		let indice: number = -1;
		for (let i: number = 0; i < this._contas.length; i++) {
			if (this._contas[i].numero == numero) {
				indice = i;
				break;
			}
		}
		return indice;
	}

	alterar(conta: Conta): void {
		let indice: number = this.consultarPorIndice(conta.numero);
		if (indice != -1) {
			this._contas[indice] = conta;
		}
	}

	excluir(numero: string): void {
		let indice: number = this.consultarPorIndice(numero);
		
		if (indice != -1) {
			for (let i: number = indice; i < this._contas.length; i++) {
				this._contas[i] = this._contas[i+1];
			}

			this._contas.pop();
		} 
	}

	depositar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);

		if (contaConsultada != null) {
			contaConsultada.depositar(valor);
		}
	}

    sacar(numero: String, valor: number): void {
        let contaConsultada = this.consultar(numero);

        if (contaConsultada != null) {
            contaConsultada.sacar(valor);
        }
    }

    transferir(numeroDebito: string, numeroCredito: string, valor: number){
        let contaCredito: Conta = this.consultar(numeroCredito);
        let contaDebito: Conta = this.consultar(numeroDebito);

        if (contaCredito != null && contaDebito != null) {
            contaDebito.transferir(contaCredito, valor);
        }
    }

    calcularQuantidadeContas(): number {
        return this._contas.length;
    }

    calcularTotalSaldos(): number {
        let totalSaldo: number = 0;
        for (let conta of this._contas) {
            totalSaldo += conta.saldo;
        }

        return totalSaldo;
    }

    calcularMediaSaldos() {
        return this.calcularTotalSaldos()/this.calcularQuantidadeContas();
    }

	renderJuros(numero: String) {
		let contaConsultada = this.consultar(numero);/*A*/
		
		if (contaConsultada instanceof Poupanca) {/*B*/
			let poupanca: Poupanca = <Poupanca> contaConsultada;
			poupanca.renderJuros();/*C*/
		}
	}
}


let banco : Banco = new Banco();/*D*/
//Juros Conta
banco.inserir(new Conta("1", 100));
banco.renderJuros("1");
console.log(banco.consultar("1").saldo);
//Juros Deposito
banco.inserir(new Poupanca("2", 100, 0.5));
banco.renderJuros("2");
console.log(banco.consultar("1").saldo);


/*5. Suponha duas classes Produto e ProdutoPerecivel. Produto tem atributos privados
_id, _descricao, _quantidade e _valor. Já ProdutoPerecivel tem as mesmas
características de Produto, porém possui a mais um atributo chamado
_dataValidade (https://www.javatpoint.com/typescript-date-object).
Produto possui dois métodos: repor e darBaixa, onde ambos somam e
subtraem uma quatidade passada por parâmetro do atributo quantidade. Além
disso, um produto perecível possui um método que diz se um produto está válido
ou não comparando sua data de validade com a data atual.
Dessa forma implemente:
a. Usando herança, as duas classes Produto e ProdutoPerecivel;
b. Uma classe chamada Estoque que possui um atributo privado que é um
array de produtos (Produto ou ProdutoPerecivel);
c. Métodos para Inserir, consultar, excluir produtos na classe estoque;
d. Crie validações para não deixar serem incluídos produtos com mesmo id ou
mesmo nome;
e. Os métodos repor e darBaixa, onde após uma consulta são chamados os
métodos da classe produto para finalmente alterar a quantidade;
f. Um método que liste todos os produtos perecíveis vencidos.*/


class produto{
	private _id:number;
	private _descricao:string;
	private _quantidade :number;
	private _valor:number;

	constructor(_id: number, _descricao: string,_quantidade:number,_valor:number) {
        this._id=_id;
        this._descricao=_descricao;
        this._quantidade=_quantidade;
        this._valor=_valor;
	}
	
	get id(): number {
		return this._id;
	}

	get descricao(): string {
		return this._descricao;
	}	
	get quantidade(): number {
		return this._quantidade;
	}	
	get valor(): number {
		return this._valor;
	}
	repor(quantidade: number): number{
		return this._quantidade = this.quantidade + quantidade;
  	 }
   	darBaixa(quantidade:number):number{
	   return this._quantidade = this.quantidade - quantidade;
   	}
}

class ProdutoPerecivel extends produto{
	constructor(id: number, descricao: string,quantidade:number,valor:number,private _dataValidade:Date) {
		super(id,descricao,quantidade,valor);
	}
	
	get dataValidade():Date{
		return this._dataValidade;
	}
	éValido():any{
		if (this.dataValidade < new Date()){
			return 1
		}
		else
		{
			return 0
		}
	}
}

class Estoque {
	//constructor(id: number, descricao: string,quantidade:number,valor:number,dataValidade:number) {
	//	super(id,descricao,quantidade,valor,dataValidade);
	//}
	private _produtos:produto[]=[];


	get produtos():any{
		return this._produtos
	}

	public consultar(id: number): produto {
		let produt:produto;
		for (let produto of this.produtos) {
			if (produto.obter_Numero() == id) {
				produt = produto;
				break;
			}
		}
		return produt;
	}

	private Indice(id:number): number {
		let indice: number = -1;
		for (let i: number = 0; i < this.produtos.length; i++) {
			if (this.produtos[i].Id ==id) {
				indice = i;
				break;
			}
		}
		return indice;
	}

	public excluir(id: number): void {
		let indice: number = this.Indice(id);
		
		if (indice != -1) {
			for (let i: number = indice; i < this.produtos.length; i++) {
				this.produtos[i] = this.produtos[i+1];
			}

			this.produtos.pop();
		} 
	}

	public inserir(Inserir: any ): any {
        const Id = Inserir;
		if(this.Indice(Id) == -1){
			this.produtos.push(Id);
        }else{
			console.log(`Tente Novamente`)
        }
    }

	public repor(quantidade: number, id:number){
		let indice: number = this.Indice(id);
		this.produtos[indice].repor(quantidade)
	}
	public darbaixa(quantidade: number, id:number){
		let indice: number = this.Indice(id);
		this.produtos[indice].darbaixa(quantidade)
	}
	public produtos_perecíveis():any{
		for(let lista of this.produtos){
			if(lista.isValido() == 0){
				console.log(lista)
			}
		}
	}

}		


let Placa_Video1:produto = new produto(1,"ASUS A329",80, 700);
let Placa_Mãe:produto = new produto(2,"GTX-1050 TI",31, 1950);
let Placa_Video2:produto = new produto(3,"GTX-1070 TI",10, 4020);
Placa_Video1.repor(100)
Placa_Mãe.darBaixa(50)
console.log(Placa_Video1)
console.log(Placa_Video2)
console.log(Placa_Mãe)


let camarao:ProdutoPerecivel = new ProdutoPerecivel(1,"camarão",40, 12, new Date("2021/11/16"));
let creme_de_leite:ProdutoPerecivel = new ProdutoPerecivel(2,"creme de leite",90,15.00, new Date("2021/10/15"));
let milho:ProdutoPerecivel = new ProdutoPerecivel(3,"milho",123, 4.73, new Date("2020/12/01"));


let estoque = new Estoque()
estoque.inserir(camarao)
estoque.inserir(creme_de_leite)
estoque.excluir(3)
console.log(estoque)


