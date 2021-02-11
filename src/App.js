import React from 'react'
import axios from 'axios'
import 'bulma'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      questionList: null,
      currentQuestion: ""
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  componentDidMount () {
    axios
      .get("/questions")
      .then(result => {
        this.setState({ questionList: result.data.sort(() => Math.random() - 0.5) })
        this.setState({ currentQuestion: this.state.questionList.pop() })
      })
      .catch(err => console.log(err))
  }

  nextQuestion () {
    const questionList = this.state.questionList
    const random = Math.floor(Math.random() * questionList.length);
    const question = questionList.splice(random, 1)[0]
    this.setState({
      questionList: questionList,
      currentQuestion: question
    })
  }

  render () {
    return (
      <section className="hero is-black is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            { this.state.questionList === null ? (
              <p className="is-size-3 p-5">Loading...</p>
            ) : this.state.questionList.length === 0 ? (
              <p className="is-size-3 p-5">No more questions available</p>
            ) : (
              <div>
                <p className="is-size-3 p-5 mb-5">{this.state.currentQuestion}</p>
                <button className="button is-large is-dark" onClick={this.nextQuestion}>Next</button>
              </div>
            )}
          </div>
        </div>

      </section>
    )
  }
}

// const App = (props) => {
//   const [ questionList, setQuestions ] = useState(null)
//   const [ currentQuestion, setCurrentQuestion] = useState("Welcome!")

//   useEffect(() => {
//     axios
//       .get("/questions")
//       .then(result => setQuestions(result.data))
//       .catch(err => console.log(err))
//   })

//   const nextQuestion = () => {
//     const random = Math.floor(Math.random() * questionList.length);
//     const question = questionList.splice(random, 1)[0]
//     setCurrentQuestion(question)
//   }


// }

export default App;
