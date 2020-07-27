# Snake

Jeu snake en Javascript vanilla

Plateau de 100 cases représentées par 100 Div
// Les cases vont de 0 à 99
      // Le plateau est une ligne de 100 cases, 10 cases par côté
      // Pour se déplacer par rapport à l'index des cases
      // Pour aller à droite : +1
      // pour aller à gauche : -1
      // pour aller au-dessus : -10 (10cases avant représente la case de la ligne au-dessus)
      // pour aller en-dessous : +10 (10cases après représente la case de la ligne en-dessous)

 Intervalle de temps pendant lequel on teste les collisions, crocage de pomme  etc...
 Le joueur n'a pas la main sur les déplacements pendant cette fonction donc :
 Si snake est au niveau des cases du bord ou à 1 case de son corps, ça veut dire qu'au prochain mouvement il va percuter les bords ou lui-même
   
 Echec si touche les bords : (snake situé sur cases du bord et toujours en direction du bord)
  Bord haut : cases de 0 à 9 et direction vers haut
  Bord bas : cases de 90 à 99 et direction vers bas
  Bord droite : cases % 10 + 9 (9,19,29 etc..) et direction vers droite
  Bord gauche : cases % 10 == 0 (0,10,20 etc..) et direction vers haut
        
 Pour dessiner snake : 
  ajouter l'attribut class 'snake'
  quand il avance : 
    ajout de la classe 'snake' sur la div où arrive la tête.
    effacement de la classe 'snake' sur la div où était la queue.
  
     
  
