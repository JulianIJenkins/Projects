package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
	"strconv"
	"unicode"
	"sort"

)

var wager string
var converted_wager int
var bank = 100
var horse_bet string
var converted_horse_bet int
var profit int
var total_profit int
var horses_names = [5]string{"Stallion", "Buck", "Champ", "Apollo", "Cash"}

const (
	totalDistance = 100 // Distance to finish line
	numHorses     = 5   // Number of horses in the race
	halfDistance  = totalDistance / 2 // Distance for the first half of the race
	raceDelay     = 2400 * time.Millisecond
	threeQuaterDistance = (3*totalDistance) / 4 // Distance at 3rd turn
	quaterDistance = totalDistance / 4
)

type Horse struct {
	id       int
	position int
	speed    int
/*Deleted Stamina as it was an old feature we no longer use*/
}

// Function to find the leader after each update
func findLeader(horses []Horse) (int, int) {
	var leaderID int
	var maxPosition int

	// Find the horse with the highest position
	for _, horse := range horses {
		if horse.position > maxPosition {
			maxPosition = horse.position
			leaderID = horse.id
		}
	}
	return leaderID, maxPosition
}

// Simulates each horse's racing progress
func (h *Horse) race(wg *sync.WaitGroup, updates chan<- string, done chan<- int, horses []Horse, milestones *[3]bool, raceFinished *bool) {
	defer wg.Done()

	// Set a consistent speed for the first half of the race
	const consistentSpeed = 10

	for h.position < totalDistance {
		// If race is finished, stop updating
		if *raceFinished {
			return
		}

		// Use consistent speed for the first half, then switch to the horse's individual speed
		currentSpeed := h.speed
		if h.position < threeQuaterDistance {
			currentSpeed = consistentSpeed
		}

		// Move forward by the current speed
		time.Sleep(time.Duration(1000/currentSpeed) * time.Millisecond)
		time.Sleep(raceDelay)

		// Update the horse's position
		h.position += currentSpeed

		// Ensure that the position does not exceed 100
		if h.position > totalDistance {
            h.position = totalDistance
        }

		// Send update message after position change
		//updates <- fmt.Sprintf("%s is now %d%% through the race.\n", horses_names[h.id - 1], h.position)

		// Check if the horse is the first to hit the 25%, 50%, or 75% point
		if h.position >= quaterDistance && !milestones[0] {
			milestones[0] = true
			sendMilestoneUpdate(updates, horses, "first turn (25%)")
		} else if h.position >= halfDistance && !milestones[1] {
			milestones[1] = true
			sendMilestoneUpdate(updates, horses, "halfway point (50%)")
		} else if h.position >= threeQuaterDistance && !milestones[2] {
			milestones[2] = true
			sendMilestoneUpdate(updates, horses, "final turn (75%)")
		}

		// Check if the horse finished the race
		if h.position >= totalDistance {
			done <- h.id
			return
		}
	}
}

func sendMilestoneUpdate(updates chan<- string, horses []Horse, milestone string) {
    // Sort horses by position in descending order
    sortedHorses := make([]Horse, len(horses))
    copy(sortedHorses, horses)
    sort.Slice(sortedHorses, func(i, j int) bool {
        return sortedHorses[i].position > sortedHorses[j].position
    })

    // Create the leaderboard message
    message := fmt.Sprintf("Horses have reached the %s!\nLeaderboard:\n", milestone)
    for i, horse := range sortedHorses {
        message += fmt.Sprintf("%d. %s\n", i+1, horses_names[horse.id-1])
    }

    // Send the message to the updates channel
    updates <- message
}


func isValidWager(x int) bool {
	// Check if wager is within the range of bank
	if x > bank || x < 0 {
		return false
	}
	return true
}

func isValidHorse(y int) bool {
	if y > 5 || y < 0 {
		return false
	}
	return true
}

func isValidInput(s string) bool {
	if len(s) == 0 {
		return false
	}

	// Allow optional negative sign at the start
	if s[0] == '-' {
		s = s[1:] // Remove the minus sign for further checks
	}

	// Check if all remaining characters are digits
	for _, ch := range s {
		if !unicode.IsDigit(ch) {
			return false
		}
	}
	return true
}

func convertInput(s string) int {
	number, err := strconv.Atoi(s)
	if err != nil {
		fmt.Println("Error converting to integer:", err)
		return number
	}
	return number
}

func convertNames() {

}

func validateInput(s string) int {
	for !isValidInput(s) {
		fmt.Printf("%s is not a numerical value, please type a numerical value: ", s)
		fmt.Scanln(&s)
	}
	return convertInput(s)
}

func mainmenu() {
	fmt.Println("Welcome to horse racing in Go!")
	fmt.Printf("Bank: $%d\n", bank)
	fmt.Printf("Please type in how much money you would like to bet (i.e 50 for $50): ")
	fmt.Scanln(&wager)

	converted_wager = validateInput(wager)
	for !isValidWager(converted_wager) {
		fmt.Printf("Bank: $%d\n", bank)
		fmt.Printf("You don't have $%d in your bank. Try betting with what you have: ", converted_wager)
		fmt.Scanln(&wager)
		converted_wager = validateInput(wager)
	}

	fmt.Println("Which horse would you like to bet on (1,2,3,4,5)")
    printHorseNames()
	fmt.Scanln(&horse_bet)

	converted_horse_bet = validateInput(horse_bet)
	for !isValidHorse(converted_horse_bet) {
		fmt.Printf("%d is not one of the horses. Pick a horse 1-5: ", converted_horse_bet)
		fmt.Scanln(&horse_bet)
		converted_horse_bet = validateInput(horse_bet)
	}

	fmt.Printf("You bet $%d on %s.\n", converted_wager, horses_names[converted_horse_bet - 1])
	time.Sleep(time.Duration(1000) * time.Millisecond)
}

func countDown() {
	for i := 3; i >= 1; i-- {
		fmt.Printf("Race starting in.. %d", i)
		fmt.Println()
		time.Sleep(time.Duration(1000) * time.Millisecond)
	}
	fmt.Println("GO!\n")
}

func printHorseNames() {
    for horse := range(horses_names) {
        fmt.Printf("%d - %s\n", horse + 1, horses_names[horse])
    }
}

// Function to ask the user if they want to play again
func playAgain() bool {
	var response string
	fmt.Print("Do you want to play again? (y/n): ")
	fmt.Scanln(&response)
    // Check if input is y or n
    for (response != "y" && response != "Y") && (response != "n" && response != "N") {
        fmt.Printf("%s is not a valid input choose (y/n):", response)
        fmt.Scanln(&response)
    }
	return response == "y" || response == "Y"
}

func main() {
	for {
		// Show the menu, start the race, and evaluate the outcome
		mainmenu()
		countDown()
		rand.Seed(time.Now().UnixNano())
		var wg sync.WaitGroup
		updates := make(chan string)
		done := make(chan int)

		// Initialize horses with random speeds and stamina
		horses := make([]Horse, numHorses)
		for i := 1; i <= numHorses; i++ {
			horses[i-1] = Horse{
				id:       i,
				position: 0,
				speed:    rand.Intn(10) + 5, // Random speed between 5 and 15
			}
		}

		// Create an array to track if the 25%, 50%, and 75% milestones have been reached
		var milestones [3]bool

		// Flag to indicate if the race is finished
		raceFinished := false

		// Start the race for each horse
		for i := range horses {
			wg.Add(1)
			go horses[i].race(&wg, updates, done, horses, &milestones, &raceFinished)
		}

		// Print updates in a separate goroutine
		go func() {
			for update := range updates {
				fmt.Println(update)
                // Check to ensure that when the first horse finishes printing stops
			}
		}()

		// Wait for the first horse to finish
		winner := <-done
		

		// Mark the race as finished and notify all goroutines
		raceFinished = true

		// Wait for all horses to finish and close updates channel
		go func() {
			wg.Wait()
			close(updates) // Close updates channel after all horses are done
		}()

		time.Sleep(2 * time.Second)
		fmt.Printf("%s finished first!\n", horses_names[winner-1])
		fmt.Printf("%s wins the race!\n", horses_names[winner-1])

		// Check to see if the user wins or loses
		if winner == converted_horse_bet {
			profit = converted_wager * numHorses
			bank += profit
			total_profit += profit
			fmt.Printf("Congratulations, you won $%d!\n", profit)
		} else {
			bank -= converted_wager
			fmt.Printf("You lost your bet of $%d!\n", converted_wager)
		}
		fmt.Printf("You have $%d in your bank.\n", bank)

		// Ask the user if they want to play again
		if !playAgain() || bank <= 0 {
			fmt.Println("Thanks for playing!")
			break
		}
	}
}