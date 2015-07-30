info #client %l:%M:%r:%X:%x:%T:%t

# mellon
A client for the MUD MUME (Multi-Users in Middle Earth) built on Express 4 and Socket.io

## MUME Info Format
INFO FORMAT

The following format characters are available with the info command:

%% - %                          %l - level
%( - start status colour        %M - character name
%) - end status colour          %m - spell casting speed
%. - new line                   %N - months part of age
%A - absorbtion                 %n - days part of age
%a - age in years               %O - offensive bonus
%B - reference abilities        %o - constitution
%b - base abilities             %P - playtime (in hours)
%C - carrying (pounds)          %p - perception
%c - citizen list               %q - alignment
%D - dodge bonus                %R - alertness
%d - dexterity                  %r - detailed gold
%E - maximum mana               %S - strength
%e - mana                       %s - perception smell
%F - carrying encumbrance       %T - travel points to level
%f - affects                    %t - travel points
%g - gold                       %v - perception vision
%H - perception hear            %W - weight
%h - height                     %w - wisdom
%I - willpower                  %X - experience to level
%i - intelligence               %x - experience
%J - max movement points        %Y - mood
%j - movement points            %y - wimpy setting
%K - war fame                   %Z - maximum hit points
%k - parry bonus                %z - hit points
%L - session time (in minutes)

Other characters will be printed as they are.

Thanks Tumeric, who did the slave work and came up with most of the
abbreviations.

Example:

   info Your fortune is: %r%.Travel points: %t

can give as output

   Your fortune is: 52 gold coins 11 silver pennies
   Travel points: 0

See also: INFO, SCORE, STAT