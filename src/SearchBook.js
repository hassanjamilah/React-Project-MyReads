import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
class SearchBook extends React.Component {
    state={
        query:'',
        searchBooks:[]

    }

    handleSearch = (e)=>{
        console.log(e.targer)
    }

    updateQuery = (query)=>{
        this.setState(()=>({
            query: query
        }))
        console.log(query)
        BooksAPI.search(query)
        .then((books)=>{
            this.setState(()=>{
                this.state.searchBooks = books
            })
            console.log(books)
        })
    }
  
    componentDidMount(){
        console.log('Did mount')
        BooksAPI.search('android')
        .then((books)=>{
            this.setState(()=>{
                this.state.searchBooks = books
            })
            console.log('books 11' , books)
        })
    }

    
    render() {
        const { query ,searchBooks} = this.state
        const {allBooks , onChangeBookState} = this.props
        

        const filteredBooks = query === '' ?
        allBooks:
        searchBooks
        // allBooks.filter((b) => (b.title.toLowerCase().includes(query.toLowerCase()) ))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" 
                        value={query}
                         onChange={(event) => this.updateQuery(event.target.value)}

                        />

                    </div>
                </div>
                <div className="search-books-results">
                <ListBooks allBooks={filteredBooks} shelf='' onChangeBookState= {onChangeBookState}/>
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}
export default SearchBook