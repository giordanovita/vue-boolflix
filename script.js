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
            mouvies:[],
            tvSeries:[],
            imgPath:'http://image.tmdb.org/t/p/w342/',
            starsScore:''

                    },
        /* mounted:{
           
            },
 */
            methods:{
                search:function(){
                        
                    axios.get('https://api.themoviedb.org/3/search/movie?',{
                        params: {
                        'api_key':'624a732bf22bf0e8515847d96dff0492',
                        'query': this.query
                         }
                    }).then(data =>{
                        this.mouvies= data.data.results;
                       // console.log(this.mouvies)
                        return this.query='';
                    })

                    axios.get(' https://api.themoviedb.org/3/search/tv?',{
                        params: {
                        'api_key':'624a732bf22bf0e8515847d96dff0492',
                        'query': this.query
                         }
                    }).then(data =>{
                        this.tvSeries= data.data.results;
                        console.log(this.tvSeries)
                        return this.query='';
                    })

/* 
                          .catch(() => {
                            console.log('Errore');
                        });   */
                },

                showFlag:function(language){

                    if(language =='en'){
                        return '<img src="img/england.png">';
                    }else if(language =='it'){
                        return '<img src="img/it.png">';
                    }
                    else if(language =='de'){
                        return '<img src="img/de.png">';
                    }
                    else if(language =='es'){
                        return '<img src="img/es.png">';
                    }
                    else{
                        return language
                    }
                },

                showStars:function(elem){
                    let stars= Math.round((elem) / 2);

                    return stars
                    
                   

                   
    
                }
                
        

            }
        })
    }


function init() {
    initVue()
}
document.addEventListener('DOMContentLoaded', init);

