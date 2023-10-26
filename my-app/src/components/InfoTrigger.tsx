import React, { FC } from 'react';

const InfoTrigger:FC=()=>{
    return(
        <div className='InfoTrigger'>
            <div className="types_blocks" style={{marginTop: '40px'}}>
            <div className="types_1b">
                <p>Причины<sup>6</sup></p>
                <p>
                Причины, которые привели к стойкому убеждению в собственной никчемности:<br></br>
                1. Постоянное неодобрение родителей или авторитетных фигур<br></br>
                2. Чрезмерный контроль со стороны родителей<br></br>
                3. Недостаток внимания со стороны значимых взрослых<br></br>
                4. Низкая успеваемость<br></br>
                5. Религиозные убеждения<br></br>
                6. Сравнение с другими<br></br>
                7. Социальное сравнение<br></br>
                8. Жестокое обращение<br></br>
                9. Внешний вид<br></br>
                </p>
            </div>
            <div className="types_1b">
                <p>Триггеры<sup>6</sup></p>
                <p>
                    Получение квалификации<br></br>
                    Повышение по службе<br></br>
                    Обучение новому<br></br>
                </p>
            </div>
            </div>
        </div>
    )
}

export default InfoTrigger