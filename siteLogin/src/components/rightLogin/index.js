import { useState, useEffect } from "react"
import styles from "./rightLogin.module.css"
//import { PiCassetteTapeThin } from "react-icons/pi"
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function RightLogin(){

    // Const criada para definir se vai ser login ou register
    const [estado2, setEstado2] = useState('Login')

    function cadastrarUsuario(e){
        e.preventDefault()
    }

    function mudarParaRegistro(e){
        e.preventDefault()
        setEstado2('Registrar')
    }

    function mudarParaLogin(e){
        e.preventDefault()
        setEstado2('Login')
    }

    function lacoDeValidacao(array, arrayComparativo){
        /*
        O primeiro array é o que vamos comparar
        O segundo array é o de base, exemplo: alfabeto, números, etc.
        */
       let tamanhoArray = array.length
        for (var j = 0; j <= tamanhoArray; j++){
            for (var i = 0; i <= 26; i++){
                // console.log(array[j], arrayComparativo[i])
                if (array[j] === arrayComparativo[i] && array[j] !== undefined) {
                    // console.log(array[j], arrayComparativo[i], 'Funcionou!')
                    return true
                }
            }
        }
        return false
    }

    //const [senha, setSenha] = useState()
    const [senhaRegistrar, setSenhaRegistrar] = useState('')
    const [maiorQueOito, setMaiorQueOito ] = useState('Precisa ter mais que 8 digitos')
    const [possuiMaiuscula, setPossuiMaiuscula] = useState('Precisa possuir alguma maiúscula')
    const [possuiNumero, setPossuiNumero] = useState('Precisa possuir algum número')
    const [senhaForte, setSenhaForte] = useState('')

    const [senhaConfirmar, setSenhaConfirmar] = useState()
    const [senhasIguais, setSenhasIguais] = useState()
    
    useEffect(() => {
        //console.log('Mudou o valor');
        let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        let array = [false, false, false]
        
        if (senhaRegistrar === undefined){
            // console.log('Não possui nenhum valor')
        } else{
            // console.log(senhaRegistrar.length)

            // Vai verificar se possui mais que 8 dígitos
            if (senhaRegistrar.length >= 8){
                setMaiorQueOito('')
                array[0] = true
            } else {
                setMaiorQueOito('❌ Precisa ter mais que 8 digitos')
                array[0] = false
            }

            if (lacoDeValidacao(senhaRegistrar, alfabeto)){
                setPossuiMaiuscula('')
                array[1] = true
            } else {
                setPossuiMaiuscula('❌ Precisa possuir alguma maiúscula')
                array[1] = false 
            }

            if (lacoDeValidacao(senhaRegistrar, numeros)){
                setPossuiNumero('')
                array[2] = true
            } else {
                setPossuiNumero('❌ Precissa possuir algum número')
                array[2] = false 
            }

            if (array[0] && array[1] && array[2]){
                setSenhaForte('✅ Parabéns, sua senha é forte')
            } else  {
                setSenhaForte('')
            }

        }

    }, [senhaRegistrar]);

    useEffect(() => {
        if (senhaConfirmar === senhaRegistrar){
            setSenhasIguais('✅ Senhas iguais')
        } else {
            setSenhasIguais('❌ As senhas precisam ser iguais')
        }
    }, [senhaConfirmar, senhaRegistrar]);

    return(
        <div className={styles.rightLogin}>
            <div className={styles.cartaoDeLogin}>
                {estado2==='Login'? (
                        <>
                            <h1>Login</h1>
                            <form>
                                <div className={styles.textField}>
                                    <label htmlFor="usuario">Usuário</label>
                                    <input type="text" name="usuario" placeholder="Usuário"/>
                                </div>
                                <div className={styles.textField}>
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" placeholder="Senha"/>
                                </div>
                                <button onClick={cadastrarUsuario} className={styles.buttonLogin}>Login</button>
                                <button onClick={mudarParaRegistro} className={styles.buttonRegister}>Não possui cadastro?</button>
                            </form>
                        </>
                    ) :
                estado2==='Registrar' && (
                        <>
                            <h1>Registrar</h1>
                            <form>
                                <div className={styles.textField}>
                                    <label htmlFor="usuario">Digite seu email para registrar</label>
                                    <input type="text" name="usuario" placeholder="Usuário"/>
                                </div>
                                <div className={styles.senhaRegistrar}>
                                    <label htmlFor="senha">
                                        Sua senha
                                    </label>
                                    <input 
                                        type="password" 
                                        placeholder="Senha" 
                                        onChange={(e) => setSenhaRegistrar(e.target.value)}
                                    />
                                    <ul 
                                        className={styles.VerificadorSenha} 
                                        type="none">
                                        <li>{maiorQueOito}</li>
                                        <li>{possuiMaiuscula}</li>
                                        <li>{possuiNumero}</li>
                                        <li>{senhaForte}</li>
                                    </ul>
                                </div>
                                <div className={styles.senhaRegistrar}>
                                    <label htmlFor="senhaConfirmada">Repita a senha</label>
                                    <input type="password" placeholder="Repita a senha" onChange={(e) => setSenhaConfirmar(e.target.value)}/>
                                    <ul
                                        className={styles.VerificadorSenha} 
                                        type="none">
                                        <li>{senhasIguais}</li>

                                    </ul>
                                </div>
                                <button onClick={cadastrarUsuario} className={styles.buttonLogin}>Registrar</button>
                                <button onClick={mudarParaLogin} className={styles.buttonRegister}>Possui cadastro?</button>
                            </form>
                        </>
                )}
                {/*<button onClick={mostrarVariaveis}>Mostrar o valor das variaveis</button>*/}
            </div>
        </div>
    );
}
