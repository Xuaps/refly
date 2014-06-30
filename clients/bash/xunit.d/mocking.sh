#!/bin/bash

rm -f .mocks

function clear_mocks {
    [ -e .mocks ] && while read mock
    do
        local parts=($mock)
        local script=${parts[0]}
        local func=${parts[1]}
        rm -f $script.mocked
        rm -f $script.mocked.$func.calls
    done < .mocks
    rm -f .mocks
}

function mock {
    script=$1

    head -n 1 $script > $script.mocked

    num=1
    for functionToMock  
    do
        if [ $num -ne 1 ]
        then
            echo "${functionToMock}() {" >> $script.mocked
            echo '    echo $@ '">> $script.mocked.$functionToMock.calls" >> $script.mocked
            echo "}" >> $script.mocked
        fi
        num=$(expr $num + 1)
    done

    tail -n +2 $script >> $script.mocked
    chmod +x $script.mocked

    rm -f $script.mocked.$functionToMock.calls
    touch $script.mocked.$functionToMock.calls

    echo "$script $functionToMock" >> .mocks

    echo $script.mocked
}

function assertCalled {
    numCalls=$(wc -l $1.$2.calls | awk '{ print $1 }')
	if [ "$numCalls" -gt "0" ]
	then
		pass
	else
		fail "$current_test: expected '$1.$2' to have been called."
	fi
}

function assertCalledExactly {
    numCalls=$(wc -l $2.$3.calls | awk '{ print $1 }')
	if [ "$numCalls" -eq "$1" ]
	then
		pass
	else
		fail "$current_test: expected '$2.$3' to have been called exactly $1 times but was called $numCalls."
	fi
}

function assertCalledWith {
    numCalls=$(grep "^$3$" $1.$2.calls | wc -l | awk '{ print $1 }')
	if [ "$numCalls" -gt "0" ]
	then
		pass
	else
		fail "$current_test: expected '$1.$2' to have been called with $3 but called with "$(cat $1.$2.calls)"."
	fi
}
