import React, { useState } from 'react'
import { Nav } from '../molecules/index'
import { Errors, Spinner } from '../atom/index'
import { useSurvey } from '../hooks/index'
import { Token } from '../functions/index'
import '../css/ViewSurvey.css'
import sucessFormImg from '../../img/done.png'
import { useHistory } from 'react-router-dom'
import SuccessModal from '../molecules/SuccessModal'
import { useActive } from '../hooks/index'

const ViewSurveys = ({ match }) => {
    const [active, toggleActive] = useActive()
    const history = useHistory()
    const id = match.params._id;
    const data = Token();
    const sucessHandle = () => {
        toggleActive(true)
    }
    const [survey, toggleOptions, toggleSubmit] = useSurvey(id, data, sucessHandle);
    const [error, setError] = useState('')

    const sucessBtn = () => {
        history.push('/surveys')
    }

    return (
        <>
        {
          survey ? (
            <>
                <Nav />
                <form 
                    className="viewSurvey form-viewsurvey" 
                    onSubmit={ e => setError(toggleSubmit(e)) }
                >
                    {
                        <div className="survey-body">
                            <h1 className="title-survey">
                                { survey.Poll.description }
                            </h1>
                            {
                                error && (
                                    <Errors error={ error }/>
                                )
                            }
                            {survey.Poll.questions.map((resp, index) =>
                              <div
                                  className="survey"
                                  key={ index * 20}
                              >
                                  <h3 key={ index }>
                                      {resp.name}
                                  </h3>
                                  <ul className="list-survey">
                                  {
                                      resp.options.map((response, i) =>  
                                      <li 
                                          key={ i } 
                                          className="options-survey"
                                      >
                                          <p
                                              key={ i }
                                              name={response._id}
                                              data-question={resp._id}
                                              onClick={ e => toggleOptions(e) }
                                              className="paragraph-survey"
                                              id={response._id + "Item"}
                                          >
                                              {response.option}
                                          </p>
                                      </li>)
                                  }
                                  </ul>
                              </div>)
                            }
                      </div>      
                    }
                    <button 
                        className="btn-view__survey"
                        type="submit"
                        >
                        Enviar Respuestas
                    </button>
                </form>
                {/* <div className="sucess-form" id="sucess">
                    <div className="sucess-container">
                        <img src={sucessFormImg} alt="" className="done-img"/>
                        <h1 className="done-title">Respuesta Enviada.????????</h1>
                        <button className="done-btn" onClick={sucessBtn}>Aceptar</button>
                    </div>
                </div> */}
                <SuccessModal 
                    state={ active }
                    toggle={ toggleActive }
                    image={ sucessFormImg }
                    title={"La respuesta se envio correctamente! ????????"}
                    button={ sucessBtn }
                />
            </>
          ) : <Spinner />
        }
        </>
    )
}

export default ViewSurveys