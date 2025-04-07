// Name: Julian Jenkins
// Date: 9/19/2023
// Desc: Analyzes most popular words for each year over a specific time period
// and then gives a table of the most popular words over the time period
// and shows how many times those words appeared in each year.


#include "ArrayBag.h"
#include <iostream>
#include <iomanip>
#include <fstream>

using namespace std;

// A list of common punctuation characters that might separate words in a title.
const string PUNCTUATION = " ,:;\t.()&";

// most of the papers are from 1967 - 2007, a 41-year span
const int OLDEST = 1967;
const int NEWEST = 2007;
int years = NEWEST - OLDEST + 1;

int main()
{
  ifstream data;
  data.open("papers.lst");
  if (!data) {
    cout << "Sorry, could not open file: papers.lst\n";
    return 1;
  }

  ArrayBag<string> *BagsPtr = new ArrayBag<string>[41];
  //for (int i = 0; i < NEWEST - OLDEST; i++) {
   // BagsPtr[i]->setPtr();
 // }

  vector<string> mostPopularWords(41, "");
  vector<int> popularWordCount(41,0);
  vector<int> totalWords(41,0);

  while (true) {
    int year;
    data >> year;
    if (!data)
      break;

    string authors;
    getline(data, authors, ',');
    if (!data)
      break;

    string title;
    getline(data, title);
    if (!data)
      break;

    // ignore papers outside the range OLDEST to NEWEST
    if (year < OLDEST || year > NEWEST)
      continue;
    
    int bagYear = year - 1967;

    // ignore papers if the arraybag is already full
    if (BagsPtr[bagYear].isFull())
      continue;

    bool moreWords = true;
    while (moreWords) {
      size_t pos = title.find_first_of(PUNCTUATION);
      string word;
      if (pos == string::npos) {
        word = title;
        moreWords = false;
      } else {
        word = title.substr(0, pos);
        title.erase(0, pos+1);
      }

      // ignore short words, like "A", or "the", which are mostly boring
      if (word.length() < 5)
        continue;

      // process word
      
          if (!BagsPtr[bagYear].add(word)) {
        cout << "Oops, ArrayBag is now full.\n";
        break;
          }
      
    }
  }

  // Print frequency of each word, taking care to only print each word
  // (and frequency) once. That way, if "Machine" appears say 3 times
  // in the ArrayBag, we print "3 Machine", but we only print this the
  // first time that "Machine" is encountered in the ArrayBag. It
  // would be silly to print that three times!
  //
  // NOTE: This code should be changed to instead print the most popular words
  // by each year.


  
  for (int i = 0; i < 41; i++) {
    ArrayBag<string> bagCurrent = BagsPtr[i];
    int n = bagCurrent.getCurrentSize();
    int maxCount = 0;
    string popularWord = "";

    for (int j = 0; j < bagCurrent.getCurrentSize(); j++) {
      string word = bagCurrent.get(j);
      int count = bagCurrent.getFrequencyOf(word);

      if (count > maxCount) {
        maxCount = count;
        popularWord = word;
      }
    }
    mostPopularWords[i] = popularWord;
    popularWordCount[i] = maxCount;
    totalWords[i] = n;
    cout << "Most popular word for " << i + 1967 << " is " << popularWord << ", which appeared " << maxCount << " times, among " << n << " total words for that year. \n";
  }

  ArrayBag<string> finalWords;

  for (int i = 0; i < 41; i++) {
    if (!finalWords.contains(mostPopularWords[i])) {
      finalWords.add(mostPopularWords[i]);
    }
  }

  cout << "YEAR ";
  for (int i = 0; i < finalWords.getCurrentSize(); i++) {
    cout << finalWords.get(i) << " ";
  }
  cout << endl;

  for (int i = 0; i < 41; i++) {
    cout << 1967 + i << " ";
    for (int j = 0; j < finalWords.getCurrentSize(); j++) {
      cout << BagsPtr[i].getFrequencyOf(finalWords.get(j)) << " ";
    }
    cout << endl;
  }

  return 0;
}

