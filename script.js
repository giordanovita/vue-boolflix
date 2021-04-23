/* Creare un layout base con una searchbar (una inpute un button) in cui possiamoscrivere completamente o parzialmente il nome di unfilm. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengonociò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare aschermo i seguenti valori per ognifilm trovato:
1.Titolo
2.Titolo Originale
3.Lingua
4.Voto
 */

/* Milestone 2:Trasformiamo la stringa statica della lingua in unavera e propria bandiera dellanazione corrispondente, gestendo il caso in cui nonabbiamo la bandiera dellanazione ritornata dall’API (le flag non ci sono inFontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Conla stessa azione di ricercadovremo prendere sia i film che corrispondono allaquery, sia le serie tv, standoattenti ad avere alla fine dei valori simili (le seriee i film hanno campi nel JSON dirisposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
 */


function initVue(){
    new Vue({
        el: '#app',
        data: {
            query:'',
            movies:[],
            tvSeries:[],
            imgPath:'http://image.tmdb.org/t/p/w342/',
            'info':false,
            'intro':true,
            'researchedList':false,
             actors:[],
             movieID:'',
             flag:{ 
                'en' : 'img/en.png',
                'it' : 'img/it.png'

             }             

                    },
         
            methods:{
                search:function(){
                        
                    axios.get('https://api.themoviedb.org/3/search/movie?',{
                        params: {
                        'api_key':'624a732bf22bf0e8515847d96dff0492',
                        'query': this.query
                         }
                    }).then(data =>{
                        this.movies= data.data.results;
                        
                        console.log(this.movies)
                        this.intro=false
                        this.researchedList=true
                        return this.query='';
                    })

                    axios.get(' https://api.themoviedb.org/3/search/tv?',{
                        params: {
                        'api_key':'624a732bf22bf0e8515847d96dff0492',
                        'query': this.query
                         }
                    }).then(data =>{
                        this.tvSeries= data.data.results;

                        for(let i=0;i<this.tvSeries.length;i++){
                            let serie=this.tvSeries[i];
                           // console.log(serie)
                            serie.vote_count=false
                               
                        }
                       
                        this.intro=false
                        this.researchedList=true


                        console.log(this.tvSeries)
                        return this.query='';
                    })

  
                          .catch(() => {
                            console.log('Errore');
                        });    
                },

                returnIntro:function(){
                    this.intro=true;
                    this.researchedList=false

                },

                showStars:function(elem){
                    let stars= Math.round((elem) / 2);

                    return stars
                },

                showInfo:function(el){
                    const index= this.movies.indexOf(el);
                    this.movies[index].adult=true;
                    this.info=true
                },

                showInfoSerie:function(el){
                    const index= this.tvSeries.indexOf(el);
                    this.tvSeries[index].vote_count=true;
                    this.info=true
                },

                hideInfo:function(el){
                    const index= this.movies.indexOf(el);
                    this.movies[index].adult=false;
 
                },

                hideInfoSerie:function(el){
                    const index= this.tvSeries.indexOf(el);
                    console.log(this.tvSeries[index].vote_count)
                    this.tvSeries[index].vote_count=false;
 
                },
 
                showActors:function(id){
                    axios.get('https://api.themoviedb.org/3/movie/' + id,{
                        params: {
                        'api_key':'624a732bf22bf0e8515847d96dff0492',
                        append_to_response: 'credits'
                         }
                    }).then(data =>{
                        this.movieID = data.data.id;
                        this.info = !this.info;
                        this.actors = data.data.credits.cast.slice(0,5);
                                 
                                     })
                            }
                    }
            }
    )}


function init() {
    initVue()
}
document.addEventListener('DOMContentLoaded', init);

