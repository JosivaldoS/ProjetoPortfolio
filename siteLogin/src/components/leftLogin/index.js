import styles from "./leftLogin.module.css"
import imagemDesenvolvedor from "../imagens/developer.png"

export default function LeftLogin() {
    return(
        <div className={styles.leftLogin}>
            <h1>Realize o login<br/> e junte-se à equipe.</h1>
            <img src={imagemDesenvolvedor} alt="Mulher em um computador" className={styles.leftLoginImage}/>
        </div>
    );
}
